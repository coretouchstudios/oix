import { defaultConfig } from "../defaults/defaultConfig"
import { loadEnv } from "../loaders/envLoader"
import { PlatformConfig } from "../types/configTypes"

export function buildConfig(): PlatformConfig {

  const env = loadEnv()

  return {

    environment: env.NODE_ENV || defaultConfig.environment,

    apiPort: Number(env.API_PORT) || defaultConfig.apiPort,

    aiProvider: env.AI_PROVIDER || defaultConfig.aiProvider,

    databaseUrl: env.DATABASE_URL || defaultConfig.databaseUrl,

    redisUrl: env.REDIS_URL || defaultConfig.redisUrl

  }

}
