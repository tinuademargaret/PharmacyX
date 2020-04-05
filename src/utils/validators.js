const { check } = require('express-validator/check')

const validateNewCustomer = [
    check("email")
      .not()
      .isEmpty()
      .exists()
      .withMessage("Email must be provided")
      .isEmail()
      .withMessage("email format is invalid")
      .trim()
      .normalizeEmail(),
    
    check("username")
      .not()
      .isEmpty()
      .withMessage("username cannot be empty")
      .trim()
      .escape(),
    
    check(
      "password",
      "passwords must be at least 3 chars long and contain one number"
    ).exists()
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .matches(/\d/)
    ];

const validateNewAdmin = [
  check("email")
      .not()
      .isEmpty()
      .exists()
      .withMessage("Email must be provided")
      .isEmail()
      .withMessage("email format is invalid")
      .trim()
      .normalizeEmail(),
    
    check("username")
      .not()
      .isEmpty()
      .withMessage("username cannot be empty")
      .trim()
      .escape(),
    
    check(
      "password",
      "passwords must be at least 3 chars long and contain one number"
    ).exists()
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .matches(/\d/)
    ];
  const validateLogin = [
    check("email")
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail(),

  check("password")
    .isAlphanumeric()
    .withMessage("Password must be alphanumeric characters.")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long")
  ];

  const validateUpdateCustomer = [
    check("email")
      .not()
      .isEmpty()
      .exists()
      .withMessage("Email must be provided")
      .isEmail()
      .withMessage("email format is invalid")
      .trim()
      .normalizeEmail(),
  
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name cannot be empty")
      .trim()
      .escape(),
  ];

  const validateNewProduct = [
    check("name")
      .not()
      .isEmpty()
      .exists()
      .withMessage("Name of product must be provided")
      .trim()
      .escape(),

    check("description")
      .not()
      .isEmpty()
      .exists()
      .withMessage("Please upload a description of product")
      .trim()
      .escape(),
    
    check("price")
      .not()
      .isEmpty()
      .exists()
      .withMessage("Please upload product price"),
    
    check("quantity")
      .not()
      .isEmpty()
      .exists()
      .withMessage("Please upload quantity of product available"),

    check("category_id")
      .not()
      .isEmpty()
      .exists()
      .withMessage("Please upload category Id of product")

      
  ];

  const validateNewCategory = [
    check('name')
      .not()
      .isEmpty()
      .exists()
      .withMessage('Please provide a name for this category')
      .trim()
      .escape()
  ];

  const validateQueryString = [
    check("query_string")
      .toString()
      .not()
      .isEmpty()
      .withMessage("Search term must be provided")
  ];

  const validateProductReview = [
    check("review")
    .isString()
    .withMessage("review should be string")
    .not()
    .isEmpty()
    .withMessage("review cannot be empty"),
  
    check("review")
    .isNumeric()
    .withMessage("review should be a number")
    .not()
    .isEmpty()
    .withMessage("review cannot be empty")
  ];

  const validateNewItem = [
    check("cart_id")
      .isNumeric()
      .withMessage("Cart ID must be a string")
      .not()
      .isEmpty()
      .withMessage("Cart ID cannot be empty"),
  
    check("product_id")
      .isNumeric()
      .withMessage("Product ID must be an integer")
      .not()
      .isEmpty()
      .withMessage("Product ID cannot be empty")
  ];
  

module.exports = {
  validateNewCustomer,
  validateNewAdmin,
  validateLogin,
  validateUpdateCustomer,
  validateNewProduct,
  validateNewCategory,
  validateQueryString,
  validateProductReview
};
    