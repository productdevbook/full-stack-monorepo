namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NODE_ENV: string
    CORS_ORIGIN: string

    URL: string
    PORT: string
    PLAYGROUND: string
    DATABASE_HOST: string
    DATABASE_PORT: string

    JWT_PRIVATE_KEY: string
    JWT_PUBLIC_KEY: string
    JWT_EXPIRES_IN: string
    JWT_REFRESH_EXPIRES_IN: string
    JWT_EXPIRATION_TIME: string
    JWT_AUDIENCE: string
    JWT_ISSUER: string
    JWT_COOKIE_NAME: string
    JWT_COOKIE_REFRESH_NAME: string
    JWT_COOKIE_DOMAIN: string

    SUPPORT_EMAIL: string
    DATABASE_URL: string
    SECRET_KEY: string

    EMAIL_HOST: string
    EMAIL_PORT: string
    EMAIL_SECURE: string
    EMAIL_USER: string
    EMAIL_PASSWORD: string

    BUCKET_NAME: string
    BUCKET_SECRET_KEY: string
    BUCKET_ACCESS_KEY: string
    BUCKET_REGION: string
    BUCKET_HOST: string

    REDIS_URL: string
    REDIS_CACHE_TTL: string

    MAX_FILE_SIZE: string
    MAX_FILES: string
    WS_TIME: string

    FCM_JSON:string
  }
}

