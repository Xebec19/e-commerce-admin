-- name: ReadProducts :many
SELECT product_id, category_id, product_name, price, delivery_price, gender, product_desc, quantity, country_id, created_on, updated_on
FROM public.products WHERE status = 'active' LIMIT $1 OFFSET $2;

-- name: ReadOneProduct :one
SELECT product_id, category_id, product_name, price, delivery_price, gender, product_desc, quantity, country_id, created_on, updated_on
FROM public.products WHERE status = 'active' AND product_id = $1;

-- name: DeleteOneProduct :exec
UPDATE public.products SET status = 'inactive';

-- name: UpdateOneProduct :exec
UPDATE public.products SET category_id = $1, product_name = $2, price = $3, delivery_price = $4, gender = $5, product_desc = $6, quantity = $7, updated_on = current_timestamp WHERE product_id = $8;