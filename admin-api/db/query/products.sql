-- name: ReadProducts :many
SELECT product_id, product_name, image_url, quantity, created_on, price, delivery_price, product_desc, gender, category_id, category_name, country_id, country_name, count(product_id) over () as total_count
FROM public.v_products;

-- name: ReadOneProduct :one
SELECT product_id, product_name, image_url, quantity, created_on, price, delivery_price, product_desc, gender, category_id, category_name, country_id, country_name
FROM public.v_products WHERE product_id = $1;

-- name: ReadProductImages :many
select img_id, image_url from product_images 
where product_id = $1 and is_featured=false and status = 'active';

-- name: DeleteOneProduct :exec
UPDATE public.products SET status = 'inactive' where product_id = $1;

-- name: UpdateOneProduct :exec
UPDATE public.products SET category_id = $1, product_name = $2, price = $3, delivery_price = $4, gender = $5, product_desc = $6, quantity = $7, updated_on = current_timestamp WHERE product_id = $8;

-- name: CreateProduct :one
INSERT INTO public.products
(category_id, product_name, price, delivery_price, gender, product_desc, quantity, country_id )
VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;

-- name: CreateProductImage :exec
INSERT INTO public.product_images
(product_id, image_url, updated_by, is_featured)
VALUES($1, $2, $3, $4);

-- name: UpdateProduct :exec
UPDATE public.products
SET product_name=$2, price=$3, delivery_price=$4, gender=$5, product_desc=$6, quantity=$7, country_id=$8, updated_on=CURRENT_TIMESTAMP, category_id=$9
WHERE product_id=$1;

-- name: RemoveFeaturedProductImage :exec
UPDATE public.product_images
SET status = 'inactive'
WHERE product_id=$1 and is_featured=true;

-- name: RemoveImages :exec
UPDATE public.product_images
SET status = 'inactive'
WHERE product_id=$1 and is_featured=false and status='active';

-- name: ActivateImages :exec
UPDATE public.product_images
SET status = 'active'
WHERE product_id=$1 and is_featured=false and status='inactive' and image_url=$2;