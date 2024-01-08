package user

import (
	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/util"
	"github.com/gofiber/fiber/v2"
)

func groupByDate(c *fiber.Ctx) error {
	count, err := db.DBQuery.ReadUserCountDaywise(c.Context())

	if err != nil {
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(count, "user count grouped by date"))
	return nil
}

func groupByMonth(c *fiber.Ctx) error {
	count, err := db.DBQuery.ReadUserCountMonthwise(c.Context())

	if err != nil {
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(count, "user count grouped by month"))
	return nil
}
