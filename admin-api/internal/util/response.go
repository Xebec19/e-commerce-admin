package util

import (
	"log"

	"github.com/gofiber/fiber"
)

// ErrorResponse logs error message and return error response
func ErrorResponse(err error) fiber.Map {
	log.Printf("%s", err.Error())
	return fiber.Map{
		"status":  false,
		"payload": err.Error(),
		"message": err.Error(),
	}
}

// SuccessResponse return success payload
func SuccessResponse(data interface{}, message string) fiber.Map {
	return fiber.Map{
		"status":  true,
		"payload": data,
		"message": message,
	}
}
