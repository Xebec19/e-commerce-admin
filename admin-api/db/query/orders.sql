-- name: ReadOrderCountDaywise :many
select to_char(date_trunc('day',created_on), 'YYYY-MM-DD') as day, count(*) as total_orders from orders 
where created_on >= CURRENT_DATE - INTERVAL '4 months'
group by date_trunc('day',created_on);

-- name: ReadOrderCountMonthwise :many
select to_char(date_trunc('month',created_on), 'MM') as month, count(*) as total_orders from orders 
where extract(year from created_on) = extract(year from current_date)
group by date_trunc('month',created_on);
