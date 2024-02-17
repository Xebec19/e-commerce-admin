package product

import "github.com/gofiber/fiber/v2"

func SetRoute(app *fiber.App) {
	router := app.Group("/product")
	router.Get("/list", getProducts)
	router.Get("/:id", getProductById)
	router.Delete("/:id", deleteProduct)
}
