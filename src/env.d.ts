/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_CLERK_PUBLISHABLE_KEY: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  namespace NodeJS {
    interface ProcessEnv {
      readonly CLERK_SECRET_KEY: string
      readonly NODE_ENV: 'development' | 'production' | 'test'
      readonly BASE_URL: string
      readonly CLERK_SIGN_IN_URL: string
      readonly CLERK_SIGN_UP_URL: string
      readonly DATABASE_HOST: string
      readonly DATABASE_PORT: string
      readonly DATABASE_USER: string
      readonly DATABASE_PASSWORD: string
      readonly DATABASE_NAME: string
      readonly DATABASE_CA_CERT: string
      readonly CLERK_SIGN_IN_FORCE_REDIRECT_URL: string
      readonly CLERK_SIGN_UP_FORCE_REDIRECT_URL: string
      readonly R2_ACCOUNT_ID: string
      readonly R2_ACCESS_KEY_ID: string
      readonly R2_SECRET_ACCESS_KEY: string
      readonly R2_BUCKET_NAME: string
      readonly HF_TOKEN: string
      readonly CHATTERBOX_API_KEY: string
      readonly CHATTERBOX_API_URL: string
      readonly POLAR_ACCESS_TOKEN: string
      readonly POLAR_SERVER_MODE: string
      readonly POLAR_PRODUCT_ID: string
    }
  }
}

export {}
