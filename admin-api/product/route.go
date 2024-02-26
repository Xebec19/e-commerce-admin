package product

import "github.com/gofiber/fiber/v2"

func SetRoute(app *fiber.App) {
	router := app.Group("/product")
	router.Get("/list", getProducts)
	router.Get("/:id", getProductById)
	router.Get("/:id/images", getProductImages)
	router.Delete("/:id", deleteProduct)
	router.Post("/", createProduct)
	router.Put("/:id", updateProduct)
}
