package order

import (
	"github.com/gofiber/fiber/v2"
)

func SetRoute(app *fiber.App) {
	router := app.Group("/order")
	router.Get("/list", list)
	router.Get("/grouped-by-date", groupByDate)
	router.Get("/grouped-by-month", groupByMonth)
	router.Get("/:id", getOrderDetails)
	router.Put("/:id", updateOrderStatus)
}
