-- CREATE EXTENSION IF NOT EXISTS "integer-ossp";

create type enum_status as enum ('active','inactive');

create type enum_access as enum('user','admin');

create type enum_type as enum('voucher','coupon'); -- voucher would be % type discount and coupon would be absolute value discount

create type enum_gender as enum('male','female','undefined');

create table if not exists users (
    user_id serial primary key,
    first_name varchar(200) not null,
    last_name varchar(200),
    email varchar(200) unique not null,
    phone varchar(20),
    password varchar(200) not null,
    created_on timestamp with time zone default current_timestamp,
    updated_on timestamp with time zone default current_timestamp,
    status enum_status default 'active',
    access enum_access default 'user'
);

create table if not exists discounts (
	discount_id serial primary key,
	code varchar(20) not null unique,
	"status" enum_status default 'active',
	"type" enum_type default 'voucher',
	value integer default 10,
	created_on timestamp default current_timestamp,
	updated_on timestamp default current_timestamp,
	created_by integer references users(user_id),
	updated_by integer references users(user_id),
	expired_on timestamp default current_timestamp + interval '1 year'
);

-- create a dummy discount code
-- insert into discounts (code, created_by, updated_by) values ('WELCOME10',1,1);

create table if not exists categories (
    category_id serial primary key,
    category_name varchar(200) not null,
    created_on timestamp with time zone default current_timestamp,
    image_url text,
    status enum_status default 'active'
);

create table if not exists countries (
    country_id serial primary key,
    country_name varchar(200) not null,
    currency varchar(200) not null,
    currency_symbol varchar(5) not null
);

create table if not exists products (
    product_id serial primary key,
    category_id integer references categories(category_id),
    product_name varchar(200) not null,
    price integer default 0,
    delivery_price integer default 0,
    gender enum_gender default 'undefined',
    product_desc text,
    quantity integer default 0,
    country_id integer references countries(country_id),
    created_on timestamp with time zone DEFAULT current_timestamp,
    updated_on timestamp with time zone DEFAULT current_timestamp,
    status enum_status default 'active'
);

create table if not exists product_images (
    img_id serial primary key,
    product_id integer references products(product_id),
    image_url text not null,
    created_on timestamp default current_timestamp,
    updated_on timestamp default current_timestamp,
    updated_by integer references users(user_id),
    status enum_status default 'active'
);

insert into countries (country_name, currency, currency_symbol) values('india','rupees','₹');

create table if not exists carts (
    cart_id serial primary key,
    user_id integer references users(user_id),
    discount_code varchar(20) references discounts(code),
    created_on timestamp with time zone default current_timestamp,
    updated_on timestamp with time zone default current_timestamp
);

create table if not exists cart_details (
    cd_id serial primary key,
    cart_id integer references carts(cart_id),
    product_id integer references products(product_id),
    product_price integer,
    quantity integer,
    delivery_price integer
);

create type enum_order_status as enum('processing','confirmed','delivered','cancelled','pending-payment','refunded');

create table if not exists orders (
    order_id varchar(20) primary key,
    user_id integer references users(user_id),
    price integer default 0,
    delivery_price integer default 0,
    total integer default 0,
    status enum_order_status default 'processing',
    created_on timestamp with time zone default current_timestamp,
    billing_first_name varchar(200) not null,
    billing_last_name varchar(200) not null,
    billing_email varchar(200) not null,
    billing_address text,
    shipping_first_name varchar(200) not null,
    shipping_last_name varchar(200) not null,
    shipping_email varchar(200) not null,
    shipping_address text
);

create table if not exists order_details (
    od_id serial primary key,
    order_id varchar(20) references orders(order_id),
    product_id integer references products(product_id),
    product_price integer not null,
    quantity integer not null,
    delivery_price integer not null
);
