UPDATE product_images 
SET image_url = 'https://ecommerce-rohan-admin.s3.ap-south-1.amazonaws.com/jacket-1.jpeg' 
WHERE image_url = 'https://ecommerce-rohan-admin.s3.ap-south-1.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg';

INSERT INTO PRODUCT_IMAGES (product_id, image_url, updated_by, status, is_featured) 
SELECT product_id, 
    'https://ecommerce-rohan-admin.s3.ap-south-1.amazonaws.com/jacket-3.jpeg' as image_url, 
    1 as updated_by, 
    'active' as status, 
    false as is_featured
FROM products;

INSERT INTO PRODUCT_IMAGES (product_id, image_url, updated_by, status, is_featured) 
SELECT product_id, 
    'https://ecommerce-rohan-admin.s3.ap-south-1.amazonaws.com/jacket-2.jpeg' as image_url, 
    1 as updated_by, 
    'active' as status, 
    false as is_featured
FROM products;
