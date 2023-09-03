const { body } = require("express-validator");
// registration validation
const validateUserRegistration = [
    body("name").trim().notEmpty()
        .withMessage("name is required")
        .isLength({ min: 4, max: 40 })
        .withMessage("name range 4 to 40 char"),

    body("email").trim().notEmpty()
        .withMessage("email is required!")
        .isEmail()
        .withMessage("invalid email!"),

    body("password").trim().notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password min length 6 char")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
            // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, or &)'),

    body("address").trim().notEmpty()
        .withMessage("address is required")
        .isLength({ min: 3 })
        .withMessage("address min length 3 char"),

    body("phone").trim().notEmpty()
        .withMessage("phone is required"),

    body("image").optional().isString(),


];
// login validation

module.exports = { validateUserRegistration };