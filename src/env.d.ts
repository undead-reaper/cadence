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
      readonly CLERK_SIGN_IN_URL: string
      readonly CLERK_SIGN_UP_URL: string
      readonly DATABASE_URL: string
      readonly CLERK_SIGN_IN_FORCE_REDIRECT_URL: string
      readonly CLERK_SIGN_UP_FORCE_REDIRECT_URL: string
      readonly R2_ACCOUNT_ID: string
      readonly R2_ACCESS_KEY_ID: string
      readonly R2_SECRET_ACCESS_KEY: string
      readonly R2_BUCKET_NAME: string
    }
  }
}

export {}
