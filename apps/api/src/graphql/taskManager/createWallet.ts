import { extendType, nonNull, stringArg } from 'nexus'
import { UserWallets } from 'nexus-prisma'
import { genKeypair, getKeypairData } from '@/lib/solanaUtils'
import { encrypt, generateIv } from '@/lib/crypto'
import { User } from '@prisma/client'
import { getUserWithWallet } from '@/lib/prismaManager'

export const createWallet = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createWallet', {
      type: UserWallets.$name,
      args: {
        name: nonNull(stringArg()),
        imgUrl: stringArg(),
      },
      async resolve(_, args, ctx) {
        try {
          const user: User = ctx.user
          const keypair = await genKeypair()
          const walletData = await getKeypairData(keypair)
          const privateKeyString = walletData.unit8Array.join(',')
          const iv = await generateIv()
          const encodedPrivateKeyString = await encrypt(privateKeyString, iv)
          const userData = await getUserWithWallet(user.id)
          const priority = userData ? 5 : 1
          const data = {
            name: args.name,
            imgUrl: args.imgUrl || '',
            userId: user.id,
            pubkey: walletData.pubkey,
            privateKey: encodedPrivateKeyString,
            iv,
            priority,
            sol: 0,
            usdc: 0,
            epct: 0,
          }
          console.log(data)
          const userWallet = await ctx.prisma.userWallets.create({
            data,
          })
          return userWallet
        } catch (error) {
          console.log(error)
          throw new Error(`createWallet: ${error}`)
        }
      },
    })
  },
})
