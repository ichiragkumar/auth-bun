import dotenv from "dotenv";
dotenv.config();

export class EnvKeys {
  static readonly PORT = "PORT";
  static readonly NODE_ENV = "NODE_ENV";
  static readonly JWT_SECRET = "JWT_SECRET";
  static readonly SUPABASE_URL = "SUPABASE_URL";
  static readonly SUPABASE_SERVICE_ROLE_KEY = "SUPABASE_SERVICE_ROLE_KEY";
}


export const ENV = {
  PORT: process.env[EnvKeys.PORT] ,
  NODE_ENV: process.env[EnvKeys.NODE_ENV] ,
  JWT_SECRET : process.env[EnvKeys.JWT_SECRET] ,
  SUPABASE_URL : process.env[EnvKeys.SUPABASE_URL] ,
  SUPABASE_SERVICE_ROLE_KEY : process.env[EnvKeys.SUPABASE_SERVICE_ROLE_KEY]

} as const;

const requiredEnvVars = [
    EnvKeys.PORT,
    EnvKeys.NODE_ENV,
    EnvKeys.JWT_SECRET,
    EnvKeys.SUPABASE_URL,
    EnvKeys.SUPABASE_SERVICE_ROLE_KEY

];

if (ENV.NODE_ENV === "development") {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables in development: ${missing.join(", ")}`
    );
  }
}




if (ENV.NODE_ENV === "production") {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables in production: ${missing.join(", ")}`
    );
  }
}



