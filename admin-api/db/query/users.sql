-- name: CountUser :one
SELECT count(user_id) from USERS u WHERE lower(u.EMAIL) = lower($1);

-- name: FindAdminUser :one
SELECT user_id, email, CONCAT(first_name, ' ', last_name) AS user_name, password FROM USERS u 
WHERE lower(u.EMAIL) = lower($1) AND access = 'admin';

-- name: ReadUser :one
SELECT user_id, first_name, last_name, email, phone, "password", created_on, updated_on, status, "access"
FROM public.users WHERE user_id = $1;

-- name: ReadUserCountDaywise :many
select to_char(date_trunc('day',created_on), 'YYYY-MM-DD') as day, count(*) as total_users from users 
where created_on >= CURRENT_DATE - INTERVAL '4 months'
group by date_trunc('day',created_on);

-- name: ReadUserCountMonthwise :many
select to_char(date_trunc('month',created_on), 'MM') as month, count(*) as total_users from users 
where extract(year from created_on) = extract(year from current_date)
group by date_trunc('month',created_on);
