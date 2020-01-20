CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` char(60) DEFAULT NULL,
  `credit_card` text,
  `address_1` varchar(100) DEFAULT NULL,
  `address_2` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `postal_code` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `mob_phone` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discounted_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `image` varchar(150) DEFAULT NULL,
  `image_2` varchar(150) DEFAULT NULL,
  `thumbnail` varchar(150) DEFAULT NULL,
  `number_available` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `shopping_cart` (
  `cart_id` char(32) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL, 
  `quantity` int(11) NOT NULL,
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_on` datetime NOT NULL,
  `shipped_on` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `comments` varchar(255) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `auth_code` varchar(50) DEFAULT NULL,
  `reference` varchar(50) DEFAULT NULL,
  `shipping_id` int(11) DEFAULT NULL,
  `tax_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
customer_id
[products_id]
delivery address
total amount paid
confirmed
