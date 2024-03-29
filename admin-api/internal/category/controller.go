package category

import (
	"database/sql"
	"strconv"

	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/cloud"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/util"
	"github.com/gofiber/fiber/v2"
)

func getCategory(c *fiber.Ctx) error {
	categories, err := db.DBQuery.ReadCategory(c.Context())

	if err != nil {
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(categories, "categories fetched"))
	return nil
}

func getCategoryById(c *fiber.Ctx) error {
	categoryID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	category, err := db.DBQuery.ReadCategoryByID(c.Context(), int32(categoryID))

	if err != nil {
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(category, "category fetched"))
	return nil
}

func createCategory(c *fiber.Ctx) error {
	form, err := c.MultipartForm()

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	url, err := cloud.UploadImage(form.File["image"][0])
	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	argv := db.CreateCategoryParams{
		CategoryName: form.Value["categoryName"][0],
		ImageUrl:     sql.NullString{String: url, Valid: true},
	}

	db.DBQuery.CreateCategory(c.Context(), argv)

	return c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(nil, "Category created"))
}

func updateCategory(c *fiber.Ctx) error {
	form, err := c.MultipartForm()

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	categoryID, err := strconv.Atoi(form.Value["categoryId"][0])
	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	category, err := db.DBQuery.ReadCategoryByID(c.Context(), int32(categoryID))

	if err != nil {
		return err
	}

	var url string
	fileHeader, _ := c.FormFile("image")

	if fileHeader == nil {
		url = category.ImageUrl.String
	} else {
		url, err = cloud.UploadImage(form.File["image"][0])

		if err != nil {
			c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
			return err
		}
	}

	argv := db.UpdateCategoryByIdParams{
		CategoryID:   int32(categoryID),
		CategoryName: form.Value["categoryName"][0],
		ImageUrl:     sql.NullString{String: url, Valid: true},
	}

	db.DBQuery.UpdateCategoryById(c.Context(), argv)

	return c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(nil, "category updated"))
}

func deleteCategory(c *fiber.Ctx) error {
	categoryID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	db.DBQuery.DeleteCategory(c.Context(), int32(categoryID))

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(nil, "category deleted"))
	return nil
}
