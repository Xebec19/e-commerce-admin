package order

import (
	"database/sql"

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
	orders, err := db.DBQuery.ReadOrders(c.Context())
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(orders, "orders fetched"))
	return nil
}

func getOrderDetails(c *fiber.Ctx) error {
	orderId := c.Params("id")
	order, err := db.DBQuery.ReadOrderById(c.Context(), orderId)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	orderDetails, err := db.DBQuery.ReadOrderItems(c.Context(), sql.NullString{String: orderId, Valid: true})
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	payload := map[string]interface{}{"order": order, "order_items": orderDetails}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(payload, "orders fetched"))
	return nil
}

type orderStatusRequest struct {
	Status db.EnumOrderStatus `json:"status"`
}

func updateOrderStatus(c *fiber.Ctx) error {
	orderId := c.Params("id")
	req := new(orderStatusRequest)
	if err := c.BodyParser(req); err != nil {
		return err
	}

	arg := db.UpdateOrderStatusParams{
		OrderID: orderId,
		Status:  db.NullEnumOrderStatus{EnumOrderStatus: req.Status, Valid: true},
	}

	err := db.DBQuery.UpdateOrderStatus(c.Context(), arg)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(nil, "order status updated"))
	return nil
}
