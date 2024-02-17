package product

import (
	"strconv"

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
