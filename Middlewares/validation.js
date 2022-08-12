const Joi = require("@hapi/joi");
const categorys = require("../models/categorys");
const { schema } = require("../models/voucher");

const validator = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const validatorResult = schema.validate(req.body);

      console.log("validator", req.body);
      if (validatorResult.error) {
        return res.status(400).json(validatorResult.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["params"]) req.value.params = {};
        req.value.body = validatorResult.value;

        next();
      }
    };
  },
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const validatorResult = schema.validate({ param: req.params[name] });
      if (validatorResult.error) {
        return res.status(400).json(validatorResult.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["params"]) req.value.params = {};

        req.value.params[name] = req.params[name];
        next();
      }
    };
  },

  validateCategoryQuery: (schema) => {
    return (req, res, next) => {
      const validateQuery = schema.validate(req.query);
      if (validateQuery.error) {
        return res.status(400).json(validateQuery.error);
      } else next();
    };
  },
  validateGetVoucherQuery: (schema) => {
    return (req, res, next) => {
      const validateQuery = schema.validate(req.query);

      if (validateQuery.error) {
        return res.status(400).json(validateQuery.error);
      } else next();
    };
  },
  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    userSchema: Joi.object().keys({
      username: Joi.string().min(5).max(20).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(12).required(),
      password: Joi.string().min(6).required(),
      address: Joi.string(),
      isAdmin: Joi.boolean().required(),
    }),

    userRegisterSchema: Joi.object().keys({
      username: Joi.string().min(5).max(20).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(12).required(),
      password: Joi.string().min(6).required(),
      firstname: Joi.string().min(2).max(20).required(),
      lastname: Joi.string().min(2).max(50).required(),
    }),

    userUpdateSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(12).required(),
      password: Joi.string().min(6).required(),
      address: Joi.string(),
    }),
    userLoginSchema: Joi.object().keys({
      username: Joi.string().min(5).max(20).required(),
      password: Joi.string().min(6).required(),
    }),
    voucherSchema: Joi.object().keys({
      key: Joi.string().max(2).required(),
      title: Joi.string().min(5).max(50).required(),
      discount: Joi.string().default(0),
      status: Joi.string().max(20).required(),
      img_url: Joi.string(),
      categorys: Joi.array().required(),
      stock: Joi.number(),
      price_options: Joi.array().required(),
    }),

    voucherGetQurerySchema: Joi.object().keys({
      categorykey: Joi.string().required(),
      page: Joi.number().required(),
    }),

    detailpostsSchema: Joi.object().keys({
      voucherid: Joi.string().required(),
      type: Joi.string().required(),
      content: Joi.string().required(),
    }),

    categorysSchema: Joi.object().keys({
      key: Joi.string().max(5).required(),
      title: Joi.string().min(5).max(50).required(),
    }),

    categoryQuerySchema: Joi.object().keys({
      key: Joi.string().min(2).max(5).required(),
      page: Joi.number().required(),
    }),

    paymentSchema: Joi.object().keys({
      userid: Joi.string().required(),
      purchase_items: Joi.array().required(),
      total: Joi.number().required(),
      status: Joi.string().required(),
      shipaddress: Joi.string().required(),
      contactphone: Joi.string().required(),
    }),
  },
};

module.exports = validator;
