alter table orders drop column discount_id;

alter table orders add column discount_code varchar(20);