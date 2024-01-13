package category

import "github.com/gofiber/fiber/v2"

func SetRoute(app *fiber.App) {
	router := app.Group("/category")
	router.Get("/list", getCategory)
}
