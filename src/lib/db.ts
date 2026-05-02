import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Node.js v22+ has a native WebSocket global, but it fires ErrorEvent objects
// on failure instead of Error objects. The ws package fires proper Errors,
// which prevents Next.js from surfacing "Error: [object ErrorEvent]" at runtime.
neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
