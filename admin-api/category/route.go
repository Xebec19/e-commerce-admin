package category

import "github.com/gofiber/fiber/v2"

func SetRoute(app *fiber.App) {
	router := app.Group("/category")
	router.Get("/list", getCategory)
	router.Get("/list/:id", getCategoryById)
	router.Post("/create", createCategory)
	router.Post("/edit", updateCategory)
	router.Delete("/:id", deleteCategory)
}
