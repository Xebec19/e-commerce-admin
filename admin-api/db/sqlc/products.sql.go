// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0
// source: products.sql

package db

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

const deleteOneProduct = `-- name: DeleteOneProduct :exec
UPDATE public.products SET status = 'inactive'
`

func (q *Queries) DeleteOneProduct(ctx context.Context) error {
	_, err := q.db.ExecContext(ctx, deleteOneProduct)
	return err
}

const readOneProduct = `-- name: ReadOneProduct :one
SELECT product_id, category_id, product_name, price, delivery_price, gender, product_desc, quantity, country_id, created_on, updated_on
FROM public.products WHERE status = 'active' AND product_id = $1
`

type ReadOneProductRow struct {
	ProductID     uuid.UUID      `json:"product_id"`
	CategoryID    uuid.NullUUID  `json:"category_id"`
	ProductName   string         `json:"product_name"`
	Price         sql.NullString `json:"price"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
	Gender        NullEnumGender `json:"gender"`
	ProductDesc   sql.NullString `json:"product_desc"`
	Quantity      sql.NullString `json:"quantity"`
	CountryID     uuid.NullUUID  `json:"country_id"`
	CreatedOn     sql.NullTime   `json:"created_on"`
	UpdatedOn     sql.NullTime   `json:"updated_on"`
}

func (q *Queries) ReadOneProduct(ctx context.Context, productID uuid.UUID) (ReadOneProductRow, error) {
	row := q.db.QueryRowContext(ctx, readOneProduct, productID)
	var i ReadOneProductRow
	err := row.Scan(
		&i.ProductID,
		&i.CategoryID,
		&i.ProductName,
		&i.Price,
		&i.DeliveryPrice,
		&i.Gender,
		&i.ProductDesc,
		&i.Quantity,
		&i.CountryID,
		&i.CreatedOn,
		&i.UpdatedOn,
	)
	return i, err
}

const readProducts = `-- name: ReadProducts :many
SELECT product_id, category_id, product_name, price, delivery_price, gender, product_desc, quantity, country_id, created_on, updated_on
FROM public.products WHERE status = 'active' LIMIT $1 OFFSET $2
`

type ReadProductsParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

type ReadProductsRow struct {
	ProductID     uuid.UUID      `json:"product_id"`
	CategoryID    uuid.NullUUID  `json:"category_id"`
	ProductName   string         `json:"product_name"`
	Price         sql.NullString `json:"price"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
	Gender        NullEnumGender `json:"gender"`
	ProductDesc   sql.NullString `json:"product_desc"`
	Quantity      sql.NullString `json:"quantity"`
	CountryID     uuid.NullUUID  `json:"country_id"`
	CreatedOn     sql.NullTime   `json:"created_on"`
	UpdatedOn     sql.NullTime   `json:"updated_on"`
}

func (q *Queries) ReadProducts(ctx context.Context, arg ReadProductsParams) ([]ReadProductsRow, error) {
	rows, err := q.db.QueryContext(ctx, readProducts, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ReadProductsRow
	for rows.Next() {
		var i ReadProductsRow
		if err := rows.Scan(
			&i.ProductID,
			&i.CategoryID,
			&i.ProductName,
			&i.Price,
			&i.DeliveryPrice,
			&i.Gender,
			&i.ProductDesc,
			&i.Quantity,
			&i.CountryID,
			&i.CreatedOn,
			&i.UpdatedOn,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateOneProduct = `-- name: UpdateOneProduct :exec
UPDATE public.products SET category_id = $1, product_name = $2, price = $3, delivery_price = $4, gender = $5, product_desc = $6, quantity = $7, updated_on = current_timestamp WHERE product_id = $8
`

type UpdateOneProductParams struct {
	CategoryID    uuid.NullUUID  `json:"category_id"`
	ProductName   string         `json:"product_name"`
	Price         sql.NullString `json:"price"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
	Gender        NullEnumGender `json:"gender"`
	ProductDesc   sql.NullString `json:"product_desc"`
	Quantity      sql.NullString `json:"quantity"`
	ProductID     uuid.UUID      `json:"product_id"`
}

func (q *Queries) UpdateOneProduct(ctx context.Context, arg UpdateOneProductParams) error {
	_, err := q.db.ExecContext(ctx, updateOneProduct,
		arg.CategoryID,
		arg.ProductName,
		arg.Price,
		arg.DeliveryPrice,
		arg.Gender,
		arg.ProductDesc,
		arg.Quantity,
		arg.ProductID,
	)
	return err
}
