package product

import (
	"database/sql"
	"mime/multipart"
	"strconv"
	"sync"

	"github.com/Xebec19/e-commerce-admin/admin-api/cloud"
	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/util"
	"github.com/gofiber/fiber/v2"
)

func getProducts(c *fiber.Ctx) error {

	categories, err := db.DBQuery.ReadProducts(c.Context())

	if err != nil {
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(categories, "products fetched"))
	return nil
}

func getProductById(c *fiber.Ctx) error {
	productId, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	product, err := db.DBQuery.ReadOneProduct(c.Context(), int32(productId))
	if err != nil {
		return nil
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(product, "product fetched"))
	return nil
}

func deleteProduct(c *fiber.Ctx) error {
	productId, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	db.DBQuery.DeleteOneProduct(c.Context(), int32(productId))

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(nil, "product deleted"))
	return nil
}

type ProductForm struct {
	Category_ID    int32         `json:"category_id" binding:"required"`
	Product_Name   string        `json:"product_name"  binding:"required"`
	Price          int32         `json:"price"  binding:"required"`
	Delivery_Price int32         `json:"delivery_price"  binding:"required"`
	Gender         db.EnumGender `json:"gender"  binding:"required"`
	Product_Desc   string        `json:"product_desc"  binding:"required"`
	Quantity       int32         `json:"quantity"  binding:"required"`
	Country_ID     int32         `json:"country_id"  binding:"required"`
}

func createProduct(c *fiber.Ctx) error {
	productData := new(ProductForm)
	userId := c.Locals("userid").(int64)

	if err := c.BodyParser(productData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	form, err := c.MultipartForm()

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	featured_url, err := cloud.UploadImage(form.File["featured_image"][0])
	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	wg := sync.WaitGroup{}
	imgUrls := []string{}
	// upload multiple images
	for i, file := range form.File["images"] {
		wg.Add(1)
		go func(i int, file *multipart.FileHeader, urls *[]string) {
			defer wg.Done()
			url, err := cloud.UploadImage(file)
			if err != nil {
				panic(err)
			}
			imgUrls = append(imgUrls, url)
		}(i, file, &imgUrls)
	}

	wg.Wait()

	argv := db.CreateProductParams{
		CategoryID:    sql.NullInt32{Int32: productData.Category_ID, Valid: true},
		ProductName:   productData.Product_Name,
		Price:         sql.NullInt32{Int32: productData.Price, Valid: true},
		DeliveryPrice: sql.NullInt32{Int32: productData.Delivery_Price, Valid: true},
		Gender:        db.NullEnumGender{EnumGender: productData.Gender, Valid: true},
		ProductDesc:   sql.NullString{String: productData.Product_Desc, Valid: true},
		Quantity:      sql.NullInt32{Int32: productData.Quantity, Valid: true},
		CountryID:     sql.NullInt32{Int32: productData.Country_ID, Valid: true},
	}

	product, err := db.DBQuery.CreateProduct(c.Context(), argv)
	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}
	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	argv2 := db.CreateProductImageParams{
		ProductID:  sql.NullInt32{Int32: product.ProductID, Valid: true},
		ImageUrl:   featured_url,
		IsFeatured: sql.NullBool{Bool: true, Valid: true},
		UpdatedBy:  sql.NullInt32{Int32: int32(userId), Valid: true},
	}

	db.DBQuery.CreateProductImage(c.Context(), argv2)

	for _, url := range imgUrls {
		argv3 := db.CreateProductImageParams{
			ProductID:  sql.NullInt32{Int32: product.ProductID, Valid: true},
			ImageUrl:   url,
			IsFeatured: sql.NullBool{Bool: false, Valid: true},
			UpdatedBy:  sql.NullInt32{Int32: int32(userId), Valid: true},
		}

		db.DBQuery.CreateProductImage(c.Context(), argv3)
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(product, "product created"))
	return nil
}
