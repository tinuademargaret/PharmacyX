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

  const validateLogin = [];

module.exports = {
  validateNewCustomer,
  validateLogin
};
    