import { extendType, nonNull, stringArg, intArg, floatArg } from 'nexus'
import { UserWallets } from 'nexus-prisma'
import { genKeypair, getKeypairData } from '@/lib/solanaUtils'
import { encrypt, generateIv } from '@/lib/crypto'
import { User } from '@prisma/client'

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
          console.log(user)
          const keypair = await genKeypair()
          const walletData = await getKeypairData(keypair)
          const privateKeyString = walletData.unit8Array.join(',')
          const iv = await generateIv()
          const encodedPrivateKeyString = await encrypt(privateKeyString, iv)
          const newArgs = {
            userId: user.id,
            pubkey: walletData.pubkey,
            privateKey: encodedPrivateKeyString,
            iv,
          }
          const data = Object.assign({}, args, newArgs)
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
