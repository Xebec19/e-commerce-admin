package main

import (
	"log"

	"github.com/Xebec19/e-commerce-admin/admin-api/auth"
	"github.com/Xebec19/e-commerce-admin/admin-api/category"
	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/order"
	"github.com/Xebec19/e-commerce-admin/admin-api/product"
	"github.com/Xebec19/e-commerce-admin/admin-api/user"
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

	order.SetRoute(app)
	user.SetRoute(app)
	category.SetRoute(app)
	product.SetRoute(app)

	log.Printf("Server listening on %v", config.ServerAddress)
	app.Listen(config.ServerAddress)
}
