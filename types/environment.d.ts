export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      DOMAIN_API_KEY: string;
    }
  }
}