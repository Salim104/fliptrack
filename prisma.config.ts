import { defineConfig } from 'prisma/config'
import { config } from 'dotenv'

config() // load .env into process.env for the CLI

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
})
