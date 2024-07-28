CREATE TYPE order_status AS ENUM ('OPEN', 'ORDERED');

create extension if not EXISTS "uuid-ossp"


CREATE TABLE carts (
    id UUID PRIMARY key default uuid_generate_v4(),
    user_id UUID NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE,
    status order_status
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY default uuid_generate_v4(),
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    count INTEGER NOT NULL CHECK (count >= 0),
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
);