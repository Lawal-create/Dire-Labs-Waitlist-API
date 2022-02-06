import Joi from "joi";

export const waitlistValidator = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First Name is required",
    "any.only": "First Name must be a string"
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last Name is required",
    "any.only": "Last Name must be a string"
  }),
  email: Joi.string().required().email().messages({
    "string.email": "Email address is invalid",
    "any.required": "Email address is required"
  }),
  userTypes: Joi.string()
    .required()
    .valid("asset-listers", "investors")
    .messages({
      "any.required": "User types is required",
      "any.only": "User types must be asset-listers or investors"
    }),
  description: Joi.string().required().messages({
    "any.required": "Description is required"
  })
});
