package order

import (
	"strconv"

	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/util"
	"github.com/gofiber/fiber/v2"
)

func groupByDate(c *fiber.Ctx) error {
	orders, err := db.DBQuery.ReadOrderCountDaywise(c.Context())

	if err != nil {
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(orders, "orders grouped by date"))
	return nil
}

func groupByMonth(c *fiber.Ctx) error {
	orders, err := db.DBQuery.ReadOrderCountMonthwise(c.Context())

	if err != nil {
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(orders, "orders grouped by month"))
	return nil
}

func list(c *fiber.Ctx) error {
	size, err := strconv.Atoi(c.Query("size", "10"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}
	page, err := strconv.Atoi(c.Query("page", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	arg := db.ReadOrdersParams{
		Limit:  int32(size),
		Offset: int32(page * size),
	}

	orders, err := db.DBQuery.ReadOrders(c.Context(), arg)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(orders, "orders fetched"))
	return nil
}
