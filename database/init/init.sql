CREATE TABLE bookings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  identity_number VARCHAR(255) NOT NULL,
  room_type VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  booking_date DATETIME NOT NULL,
  duration INT NOT NULL,
  includes_breakfast BOOLEAN NOT NULL DEFAULT FALSE,
  total_price FLOAT NOT NULL,
  discount VARCHAR(10) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
