-- Insert data into carts
INSERT INTO carts (user_id, status) VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'OPEN'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'ORDERED');


-- Insert more data into cart_items
INSERT INTO cart_items (cart_id, product_id, count) VALUES 
('5a9c8ee8-2ad7-4cb1-acc7-0d2af2614f6b', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 1),
('5a9c8ee8-2ad7-4cb1-acc7-0d2af2614f6b', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 2),
('451ac418-947d-4ae9-a8fc-6b593e5319c3', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 3),
('451ac418-947d-4ae9-a8fc-6b593e5319c3', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 4);