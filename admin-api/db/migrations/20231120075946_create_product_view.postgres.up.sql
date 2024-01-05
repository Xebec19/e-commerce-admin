alter table product_images add column is_featured boolean default false::boolean;

create or replace view v_products as
select bp.product_id, bp.product_name, pi2.image_url , bp.quantity, bp.created_on, 
bp.price, bp.delivery_price, bp.product_desc, bp.gender, bc.category_id, bc.category_name, bc2.country_id, bc2.country_name  
from products bp
join categories bc ON bp.category_id = bc.category_id 
join countries bc2 on bc2.country_id = bp.country_id 
join product_images pi2 on pi2.product_id = bp.product_id 
where bp.status = 'active' and pi2.is_featured = true;