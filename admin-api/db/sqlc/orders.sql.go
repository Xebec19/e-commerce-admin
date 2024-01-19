// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: orders.sql

package db

import (
	"context"
	"database/sql"
)

const readOrderCountDaywise = `-- name: ReadOrderCountDaywise :many
select to_char(date_trunc('day',created_on), 'YYYY-MM-DD') as day, count(*) as total_orders from orders 
where created_on >= CURRENT_DATE - INTERVAL '4 months'
group by date_trunc('day',created_on)
`

type ReadOrderCountDaywiseRow struct {
	Day         string `json:"day"`
	TotalOrders int64  `json:"total_orders"`
}

func (q *Queries) ReadOrderCountDaywise(ctx context.Context) ([]ReadOrderCountDaywiseRow, error) {
	rows, err := q.db.QueryContext(ctx, readOrderCountDaywise)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ReadOrderCountDaywiseRow
	for rows.Next() {
		var i ReadOrderCountDaywiseRow
		if err := rows.Scan(&i.Day, &i.TotalOrders); err != nil {
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

const readOrderCountMonthwise = `-- name: ReadOrderCountMonthwise :many
select to_char(date_trunc('month',created_on), 'MM') as month, count(*) as total_orders from orders 
where extract(year from created_on) = extract(year from current_date)
group by date_trunc('month',created_on)
`

type ReadOrderCountMonthwiseRow struct {
	Month       string `json:"month"`
	TotalOrders int64  `json:"total_orders"`
}

func (q *Queries) ReadOrderCountMonthwise(ctx context.Context) ([]ReadOrderCountMonthwiseRow, error) {
	rows, err := q.db.QueryContext(ctx, readOrderCountMonthwise)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ReadOrderCountMonthwiseRow
	for rows.Next() {
		var i ReadOrderCountMonthwiseRow
		if err := rows.Scan(&i.Month, &i.TotalOrders); err != nil {
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

const readOrders = `-- name: ReadOrders :many
select o.order_id, concat(u.first_name, ' ', u.last_name) as user_name, u.email,
o.price, o.delivery_price, o.total, o.status, o.created_on, o.discount_amount, o.discount_code 
from orders o join users u on o.user_id = u.user_id LIMIT $1 OFFSET $2
`

type ReadOrdersParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

type ReadOrdersRow struct {
	OrderID        string              `json:"order_id"`
	UserName       interface{}         `json:"user_name"`
	Email          string              `json:"email"`
	Price          sql.NullInt32       `json:"price"`
	DeliveryPrice  sql.NullInt32       `json:"delivery_price"`
	Total          sql.NullInt32       `json:"total"`
	Status         NullEnumOrderStatus `json:"status"`
	CreatedOn      sql.NullTime        `json:"created_on"`
	DiscountAmount sql.NullInt32       `json:"discount_amount"`
	DiscountCode   sql.NullString      `json:"discount_code"`
}

func (q *Queries) ReadOrders(ctx context.Context, arg ReadOrdersParams) ([]ReadOrdersRow, error) {
	rows, err := q.db.QueryContext(ctx, readOrders, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ReadOrdersRow
	for rows.Next() {
		var i ReadOrdersRow
		if err := rows.Scan(
			&i.OrderID,
			&i.UserName,
			&i.Email,
			&i.Price,
			&i.DeliveryPrice,
			&i.Total,
			&i.Status,
			&i.CreatedOn,
			&i.DiscountAmount,
			&i.DiscountCode,
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
