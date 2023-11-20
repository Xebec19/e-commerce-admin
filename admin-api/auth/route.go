package auth

import (
	"github.com/gofiber/fiber/v2"
)

func SetRoute(app *fiber.App) {
	router := app.Group("/auth")
	router.Post("/login", login)
}
