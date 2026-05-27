import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('NuhroThozhiyoor2026!', 10)
  await prisma.user.create({
    data: {
      username: 'admin',
      password: hash,
      name: 'Administrator',
      role: 'admin',
    }
  })
  console.log('Admin user created successfully')
}

main().catch(console.error).finally(() => prisma.$disconnect())