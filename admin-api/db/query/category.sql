-- name: ReadCategory :many
SELECT category_id, category_name, created_on, image_url, status
FROM public.categories WHERE status = 'active'::enum_status order by created_on desc;

-- name: ReadCategoryByID :one
SELECT category_id, category_name, created_on, image_url, status
FROM public.categories WHERE category_id = $1;

-- name: CreateCategory :exec
INSERT INTO public.categories
(category_name, created_on, image_url, status)
VALUES($1, CURRENT_TIMESTAMP, $2, 'active'::enum_status);

-- name: UpdateCategoryById :exec
UPDATE public.categories SET 
category_name = $1,
image_url = $2
WHERE category_id = $3 and status = 'active'::enum_status;

-- name: DeleteCategory :exec
UPDATE public.categories SET
status = 'inactive'::enum_status
WHERE category_id = $1;