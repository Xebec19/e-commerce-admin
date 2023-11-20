package util

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

const alphabets = "abcdefghijklmnopqrstuvxyz"

// RandomString generates a random string of given length
func RandomString(n int) string {
	var sb strings.Builder
	k := len(alphabets)
	for i := 0; i < n; i++ {
		c := alphabets[rand.Intn(k)]
		sb.WriteByte(c)
	}
	return sb.String()
}

func RandomNumber(maximum int) int {
	return rand.Intn(maximum)
}

// RandomEmail generates a random email
func RandomEmail() string {
	return fmt.Sprintf("%s@email.com", RandomString(10))
}
