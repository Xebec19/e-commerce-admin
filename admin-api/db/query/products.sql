-- name: ReadProducts :many
SELECT product_id, product_name, image_url, quantity, created_on, price, delivery_price, product_desc, gender, category_id, category_name, country_id, country_name
FROM public.v_products LIMIT $1 OFFSET $2;

-- name: ReadOneProduct :one
SELECT product_id, product_name, image_url, quantity, created_on, price, delivery_price, product_desc, gender, category_id, category_name, country_id, country_name
FROM public.v_products WHERE product_id = $1;

-- name: DeleteOneProduct :exec
UPDATE public.products SET status = 'inactive' where product_id = $1;

-- name: UpdateOneProduct :exec
UPDATE public.products SET category_id = $1, product_name = $2, price = $3, delivery_price = $4, gender = $5, product_desc = $6, quantity = $7, updated_on = current_timestamp WHERE product_id = $8;