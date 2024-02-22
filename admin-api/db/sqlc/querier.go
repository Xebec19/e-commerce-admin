// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package db

import (
	"context"
)

type Querier interface {
	CountUser(ctx context.Context, lower string) (int64, error)
	CreateCategory(ctx context.Context, arg CreateCategoryParams) error
	CreateProduct(ctx context.Context, arg CreateProductParams) (Product, error)
	CreateProductImage(ctx context.Context, arg CreateProductImageParams) error
	DeleteCategory(ctx context.Context, categoryID int32) error
	DeleteOneProduct(ctx context.Context, productID int32) error
	FindAdminUser(ctx context.Context, lower string) (FindAdminUserRow, error)
	ReadCategory(ctx context.Context) ([]Category, error)
	ReadCategoryByID(ctx context.Context, categoryID int32) (Category, error)
	ReadOneProduct(ctx context.Context, productID int32) (VProduct, error)
	ReadOrderCountDaywise(ctx context.Context) ([]ReadOrderCountDaywiseRow, error)
	ReadOrderCountMonthwise(ctx context.Context) ([]ReadOrderCountMonthwiseRow, error)
	ReadOrders(ctx context.Context) ([]ReadOrdersRow, error)
	ReadProducts(ctx context.Context) ([]ReadProductsRow, error)
	ReadUser(ctx context.Context, userID int32) (User, error)
	ReadUserCountDaywise(ctx context.Context) ([]ReadUserCountDaywiseRow, error)
	ReadUserCountMonthwise(ctx context.Context) ([]ReadUserCountMonthwiseRow, error)
	UpdateCategoryById(ctx context.Context, arg UpdateCategoryByIdParams) error
	UpdateOneProduct(ctx context.Context, arg UpdateOneProductParams) error
}

var _ Querier = (*Queries)(nil)
