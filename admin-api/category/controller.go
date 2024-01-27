package category

import (
	"database/sql"

	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/util"
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

type categoryPayload struct {
	CategoryName string `json:"categoryName" binding:"required"`
	ImageUrl     string `json:"imageUrl" binding:"required"`
	Status       string `json:"status" binding:"required"`
}

func createCategory(c *fiber.Ctx) error {
	req := new(categoryPayload)
	if err := c.BodyParser(req); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	argv := db.CreateCategoryParams{
		CategoryName: req.CategoryName,
		ImageUrl:     sql.NullString{String: req.ImageUrl, Valid: true},
	}

	db.DBQuery.CreateCategory(c.Context(), argv)

	return c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(nil, "Category created"))
}
