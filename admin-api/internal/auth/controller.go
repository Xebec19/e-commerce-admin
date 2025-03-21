package auth

import (
	"context"
	"errors"
	"time"

	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/util"
	"github.com/gofiber/fiber/v2"
)

type loginSchema struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

/*
login finds email in db, decrypt password and generates jwt token after checking credentials
*/
func login(c *fiber.Ctx) error {
	req := new(loginSchema)
	// parse and validate request body
	if err := c.BodyParser(req); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}
	// Find a user with given email
	user, err := db.DBQuery.FindAdminUser(context.Background(), req.Email)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(util.ErrorResponse(err))
	}

	// decode base64 hash
	req.Password, err = util.DecryptBase64(req.Password)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(util.ErrorResponse(err))
	}

	// check user password
	err = util.CheckPassword(req.Password, user.Password)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(util.ErrorResponse(errors.New("invalid password")))
	}

	// generate token to user
	token, err := util.CreateToken(user.UserID, 24*time.Hour)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}
	return c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(token, "User logged in"))
}
