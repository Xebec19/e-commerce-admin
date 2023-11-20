package util

import (
	"errors"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func JwtValidate(ctx *fiber.Ctx) error {
	token := ctx.Get("Authorization")
	if token == "" {
		return ctx.Status(fiber.StatusUnauthorized).JSON(ErrorResponse(errors.New("missing authorization header")))
	}
	if !strings.HasPrefix(token, "Bearer ") {
		return ctx.Status(fiber.StatusUnauthorized).JSON(ErrorResponse(errors.New("invalid authorization header")))
	}
	token = strings.TrimPrefix(token, "Bearer ")
	claims, err := VerifyToken(token)
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(ErrorResponse(err))
	}
	userid, ok := claims["Userid"].(float64)
	if !ok {
		return ctx.Status(fiber.StatusInternalServerError).JSON(ErrorResponse(errors.New("invalid userid type")))
	}
	ctx.Locals("userid", int64(userid))
	return ctx.Next()
}
