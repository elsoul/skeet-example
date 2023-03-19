import { extendType, nonNull, stringArg } from 'nexus'
import { updateUserWalletBalance } from '@/lib/prismaManager'
import { UserWallets } from 'nexus-prisma'
import { fromGlobalId } from 'graphql-relay'

export const updateBalance = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateBalance', {
      type: UserWallets.$name,
      args: {
        userWalletId: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        try {
          const { id } = fromGlobalId(args.userWalletId)
          const userWallet = await updateUserWalletBalance(Number(id))
          return userWallet
        } catch (error) {
          console.log(error)
          throw new Error(`createWallet: ${error}`)
        }
      },
    })
  },
})
