-- name: ReadCategory :many
SELECT category_id, category_name, created_on, image_url, status
FROM public.categories;

-- name: CreateCategory :exec
INSERT INTO public.categories
(category_name, created_on, image_url, status)
VALUES($1, CURRENT_TIMESTAMP, $2, 'active'::enum_status);