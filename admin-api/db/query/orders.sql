-- name: ReadOrderCountDaywise :many
select to_char(date_trunc('day',created_on), 'YYYY-MM-DD') as day, count(*) as total_orders from orders 
where created_on >= CURRENT_DATE - INTERVAL '4 months'
group by date_trunc('day',created_on);

-- name: ReadOrderCountMonthwise :many
select to_char(date_trunc('month',created_on), 'MM') as month, count(product_id) over () as total_count from orders 
where extract(year from created_on) = extract(year from current_date)
group by date_trunc('month',created_on);

-- name: ReadOrders :many
select o.order_id, concat(u.first_name, ' ', u.last_name) as user_name, u.email,
o.price, o.delivery_price, o.total, o.status, o.created_on, o.discount_amount, o.discount_code 
from orders o join users u on o.user_id = u.user_id LIMIT $1 OFFSET $2;