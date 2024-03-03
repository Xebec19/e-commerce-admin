package main

import (
	"log"

	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/auth"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/category"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/cloud"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/order"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/product"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/user"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/util"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	app := fiber.New()

	app.Use(cors.New())

	app.Use(recover.New())

	db.Connect()
	cloud.NewAWS()
	cloud.NewEmailClient()

	auth.SetRoute(app)

	app.Use(JwtValidate)

	order.SetRoute(app)
	user.SetRoute(app)
	category.SetRoute(app)
	product.SetRoute(app)

	log.Printf("Server listening on %v", config.ServerAddress)
	app.Listen(config.ServerAddress)
}
