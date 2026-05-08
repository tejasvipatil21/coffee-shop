CREATE TABLE coffees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC
);

INSERT INTO coffees (name, price) VALUES
('Espresso', 120),
('Cappuccino', 150);