import { PlatformConfig } from "../types/configTypes"

export const defaultConfig: PlatformConfig = {

  environment: "development",

  apiPort: 4000,

  aiProvider: "openai",

  databaseUrl: "postgres://localhost:5432/oix",

  redisUrl: "redis://localhost:6379"

}
