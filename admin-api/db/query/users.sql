-- name: CountUser :one
SELECT count(user_id) from USERS u WHERE lower(u.EMAIL) = lower($1);

-- name: FindAdminUser :one
SELECT user_id, email, CONCAT(first_name, ' ', last_name) AS user_name, password FROM USERS u 
WHERE lower(u.EMAIL) = lower($1) AND access = 'admin';

-- name: ReadUser :one
SELECT user_id, first_name, last_name, email, phone, "password", created_on, updated_on, status, "access"
FROM public.users WHERE user_id = $1;