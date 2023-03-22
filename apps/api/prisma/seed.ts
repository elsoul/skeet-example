import { PrismaClient } from '@prisma/client'
import { generateIv } from '@/lib/crypto'
const prisma = new PrismaClient()
console.log(__dirname)
async function main() {
  const labo = await prisma.user.create({
    data: {
      uid: 'uid',
      email: 'labo@elsoul.nl',
      name: 'ELSOUL LABO',
      role: 'MASTER',
      userWallets: {
        create: {
          name: 'Main Phantom',
          pubkey: 'ELLBGa6DTdEVui6Ydt8vqsnsyybAxyVLPwY7oH6onbUq',
          priority: 1,
          iv: await generateIv(),
        },
      },
    },
  })
  console.log(labo)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
