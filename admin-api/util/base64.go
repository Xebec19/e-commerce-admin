package util

import (
	"encoding/base64"
	"fmt"
)

func DecryptBase64(hash string) (string, error) {
	decodedBytes, err := base64.StdEncoding.DecodeString(hash)
	if err != nil {
		fmt.Println("Error decoding Base64:", err)
		return "", err
	}

	// Convert the decoded bytes to a string
	decodedString := string(decodedBytes)

	return decodedString, nil
}
