import { extendType, nonNull, stringArg, intArg, floatArg } from 'nexus'
import { fromGlobalId } from 'graphql-relay'
import { UserWallets } from 'nexus-prisma'
import { genKeypair, getKeypairData } from '@/lib/solanaUtils'

export const UserWalletsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createWallet', {
      type: UserWallets.$name,
      args: {
        name: nonNull(stringArg()),
        chainType: nonNull(stringArg()),
        imgUrl: nonNull(stringArg()),
        pubkey: nonNull(stringArg()),
        privateKey: nonNull(stringArg()),
        priority: nonNull(intArg()),
        sol: nonNull(floatArg()),
        usdc: nonNull(floatArg()),
        epct: nonNull(floatArg()),
        userId: intArg(),
      },
      async resolve(_, args, ctx) {
        try {
          const keypair = await genKeypair()
          const walletDat = await getKeypairData(keypair)
          const userWallet = await ctx.prisma.userWallets.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
  },
})
