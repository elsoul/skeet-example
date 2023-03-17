import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray, fromGlobalId } from 'graphql-relay'
import { UserWallets } from 'nexus-prisma'

export const UserWalletssQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('userWalletsConnection', {
      type: UserWallets.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.userWallets.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.userWallets.count()
          },
        })
      },
    })
    t.field('getUserWallets', {
      type: UserWallets.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.userWallets.findUnique({
          where: {
            id: Number(fromGlobalId(id).id),
          },
        })
      },
    })
  },
})