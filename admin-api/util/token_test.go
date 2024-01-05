package util

import (
	"testing"
	"time"

	"github.com/stretchr/testify/require"
)

func TestJWTMaker(t *testing.T) {
	id := RandomNumber(10)
	duration := time.Minute

	token, err := CreateToken(int32(id), duration)
	require.NoError(t, err)
	require.NotEmpty(t, token)

	payload, err := VerifyToken(token)
	require.NoError(t, err)
	require.NotEmpty(t, token)
	require.NotEmpty(t, payload)
}
