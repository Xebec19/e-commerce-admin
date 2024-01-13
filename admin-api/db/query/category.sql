-- name: ReadCategory :many
SELECT category_id, category_name, created_on, image_url, status
FROM public.categories;