import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray, fromGlobalId } from 'graphql-relay'
import { SolanaTransfer } from 'nexus-prisma'

export const SolanaTransfersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('solanaTransferConnection', {
      type: SolanaTransfer.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.solanaTransfer.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.solanaTransfer.count()
          },
        })
      },
    })
    t.field('getSolanaTransfer', {
      type: SolanaTransfer.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.solanaTransfer.findUnique({
          where: {
            id: Number(fromGlobalId(id).id),
          },
        })
      },
    })
  },
})