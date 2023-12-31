package main

import (
	"log"

	"github.com/Xebec19/e-commerce-admin/admin-api/auth"
	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/util"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	app := fiber.New()

	app.Use(cors.New())

	db.Connect()

	auth.SetRoute(app)
	app.Use(util.JwtValidate)

	log.Printf("Server listening on %v", config.ServerAddress)
	app.Listen(config.ServerAddress)
}
