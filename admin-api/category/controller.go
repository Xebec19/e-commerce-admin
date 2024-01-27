package category

import (
	"database/sql"

	"github.com/Xebec19/e-commerce-admin/admin-api/cloud"
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

func createCategory(c *fiber.Ctx) error {
	form, err := c.MultipartForm()

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	url, err := cloud.UploadImage(form.File["imageUrl"][0])
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
