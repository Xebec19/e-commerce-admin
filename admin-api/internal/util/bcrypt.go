package util

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

// HashPassword takes a string and returns its hash
func HashPassword(password string) (string, error) {
	// create hash
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}
	return string(hashedPassword), nil
}

// CheckPassword expects password and a hash, and returns whether they both match or not
func CheckPassword(password string, hashedPassword string) error {
	// compare hash and password
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
