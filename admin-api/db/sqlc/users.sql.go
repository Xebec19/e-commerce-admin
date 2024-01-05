// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: users.sql

package db

import (
	"context"
)

const countUser = `-- name: CountUser :one
SELECT count(user_id) from USERS u WHERE lower(u.EMAIL) = lower($1)
`

func (q *Queries) CountUser(ctx context.Context, lower string) (int64, error) {
	row := q.db.QueryRowContext(ctx, countUser, lower)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const findAdminUser = `-- name: FindAdminUser :one
SELECT user_id, email, CONCAT(first_name, ' ', last_name) AS user_name, password FROM USERS u 
WHERE lower(u.EMAIL) = lower($1)
`

type FindAdminUserRow struct {
	UserID   int32       `json:"user_id"`
	Email    string      `json:"email"`
	UserName interface{} `json:"user_name"`
	Password string      `json:"password"`
}

func (q *Queries) FindAdminUser(ctx context.Context, lower string) (FindAdminUserRow, error) {
	row := q.db.QueryRowContext(ctx, findAdminUser, lower)
	var i FindAdminUserRow
	err := row.Scan(
		&i.UserID,
		&i.Email,
		&i.UserName,
		&i.Password,
	)
	return i, err
}

const readUser = `-- name: ReadUser :one
SELECT user_id, first_name, last_name, email, phone, "password", created_on, updated_on, status, "access"
FROM public.users WHERE user_id = $1
`

func (q *Queries) ReadUser(ctx context.Context, userID int32) (User, error) {
	row := q.db.QueryRowContext(ctx, readUser, userID)
	var i User
	err := row.Scan(
		&i.UserID,
		&i.FirstName,
		&i.LastName,
		&i.Email,
		&i.Phone,
		&i.Password,
		&i.CreatedOn,
		&i.UpdatedOn,
		&i.Status,
		&i.Access,
	)
	return i, err
}
