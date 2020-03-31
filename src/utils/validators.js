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

module.exports = {
  validateNewCustomer,
  validateLogin,
  validateUpdateCustomer
};
    