import Joi from 'joi'

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  URL: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  CORS_ORIGIN: Joi.string().required(),
  FALLBACK_LANGUAGE: Joi.string().required(),

  JWT_COOKIE_REFRESH_NAME: Joi.string().required(),
  JWT_PUBLIC_KEY: Joi.string().required(),
  JWT_PRIVATE_KEY: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  JWT_AUDIENCE: Joi.string().required(),
  JWT_ISSUER: Joi.string().required(),

  JWT_COOKIE_NAME: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),

  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_SECURE: Joi.bool().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),

  BUCKET_NAME: Joi.string().required(),
  BUCKET_SECRET_KEY: Joi.string().required(),
  BUCKET_ACCESS_KEY: Joi.string().required(),
  BUCKET_REGION: Joi.string().required(),
  BUCKET_HOST: Joi.string().required(),

  REDIS_URL: Joi.string().required(),
  REDIS_CACHE_TTL: Joi.number().required(),

  MAX_FILE_SIZE: Joi.number().required(),
  MAX_FILES: Joi.number().required(),

  FCM_JSON: Joi.string().required(),

})
