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
from orders o join users u on o.user_id = u.user_id order by o.created_on desc;

-- name: ReadOrderById :one
select order_id, concat(u.first_name, ' ', u.last_name) as user_name, 
u.email, price, delivery_price, total, o.status, o.created_on, 
concat(billing_first_name, ' ', billing_last_name) as billing_user_name, billing_email, billing_phone, billing_address,
concat(shipping_first_name, ' ', shipping_last_name) as shipping_user_name, shipping_email, shipping_phone, shipping_address,
discount_code, discount_amount
from orders o 
join users u on u.user_id = o.user_id 
where order_id = $1;

-- name: ReadOrderItems :many
select od.od_id, p.product_id, p.product_name, p.price, p.delivery_price, od.quantity, 
p.product_desc, p.status, p.country_id, c.category_id, c.category_name 
from order_details od 
join products p on p.product_id = od.product_id 
join categories c on p.category_id = c.category_id 
where od.order_id = $1; 

-- name: UpdateOrderStatus :one
update orders set status = $1 where order_id = $2 returning *;

-- name: ReduceQuantity :exec
update products set quantity = GREATEST(0,quantity - $1) where product_id = $2;