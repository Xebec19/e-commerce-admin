package product

import (
	"strconv"

	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/util"
	"github.com/gofiber/fiber/v2"
)

func getProducts(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	size, err := strconv.Atoi(c.Query("size", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	args := db.ReadProductsParams{
		Limit:  int32(size),
		Offset: int32(page * size),
	}

	categories, err := db.DBQuery.ReadProducts(c.Context(), args)

	if err != nil {
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(categories, "products fetched"))
	return nil
}
