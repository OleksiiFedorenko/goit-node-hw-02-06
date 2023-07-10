const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionTypes = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: subscriptionTypes,
      default: 'starter',
    },
    token: { type: String, default: '' },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': 'missing field email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'missing field password',
  }),
  subscription: Joi.string().valid(...subscriptionTypes),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': 'missing field email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'missing field password',
  }),
});

const schemas = { registerSchema, loginSchema };

const User = model('user', userSchema);

module.exports = { User, schemas };
