const express = require('express');

const ctrl = require('../../controllers/users');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrl.registerUser
);

router.post('/login', validateBody(schemas.loginSchema), ctrl.loginUser);

module.exports = router;
