package user

import (
	"github.com/gofiber/fiber/v2"
)

func SetRoute(app *fiber.App) {
	router := app.Group("/user")
	router.Get("/grouped-by-date", groupByDate)
	router.Get("/grouped-by-month", groupByMonth)
}
