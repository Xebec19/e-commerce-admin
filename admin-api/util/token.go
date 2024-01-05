package util

import (
	"errors"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var (
	ErrExpiredToken = errors.New("token has expired")
	ErrInvalidToken = errors.New("token is invalid")
)

// CreateToken expects email of user and generates a jwt token
func CreateToken(userid int32, duration time.Duration) (string, error) {

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Userid":    userid,
		"IssuedAt":  time.Now(),
		"ExpiredAt": time.Now().Add(duration),
	})
	// fetch jwt secret
	config, err := LoadConfig("../")
	if err != nil {
		log.Fatal("cannot load config:", err)
		return "", err
	}
	// sign token
	token, err := jwtToken.SignedString([]byte(config.JwtSecret))
	if err != nil {
		log.Fatal(err.Error())
		return "", err
	}
	return token, nil
}

// VerifyToken expects a jwt token, verifies it and sends its payload
func VerifyToken(tokenString string) (jwt.MapClaims, error) {
	// parse given token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		// load jwt secret from config
		config, err := LoadConfig("../")
		if err != nil {
			log.Fatal("cannot load config:", err)
			return nil, err
		}
		return []byte(config.JwtSecret), nil
	})

	if err != nil {
		log.Fatal(err.Error())
		return nil, err
	}
	// collect claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	} else {
		log.Fatal(err.Error())
		return nil, err
	}
}
