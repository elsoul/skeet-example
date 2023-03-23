import { PrismaClient } from '@prisma/client'
import { encrypt, generateIv } from '@/lib/crypto'
import { genKeypair, getKeypairData } from '@/lib/solanaUtils'
const prisma = new PrismaClient()
console.log(__dirname)
async function main() {
  const keypair = await genKeypair()
  const keypairInfo = await getKeypairData(keypair)
  const iv = await generateIv()
  const privateKey = await encrypt(keypairInfo.unit8Array.join(','), iv)
  const labo = await prisma.user.create({
    data: {
      uid: 'BVSSne3ffPZ02h5hRqAK9UJBjss2',
      email: 'labo@elsoul.nl',
      name: 'ELSOUL LABO',
      role: 'MASTER',
      userWallets: {
        create: {
          name: 'Main Phantom',
          pubkey: keypairInfo.pubkey,
          privateKey,
          priority: 1,
          iv,
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
