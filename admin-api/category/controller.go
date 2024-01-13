package category

import (
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
