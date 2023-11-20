package util

import (
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func TestJWTMaker(t *testing.T) {
	id, _ := uuid.NewRandom()
	duration := time.Minute

	token, err := CreateToken(uuid.UUID(id), duration)
	require.NoError(t, err)
	require.NotEmpty(t, token)

	payload, err := VerifyToken(token)
	require.NoError(t, err)
	require.NotEmpty(t, token)
	require.NotEmpty(t, payload)
}
