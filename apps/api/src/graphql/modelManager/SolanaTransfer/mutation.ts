import { extendType, nonNull, stringArg, intArg, floatArg } from 'nexus'
import { fromGlobalId } from 'graphql-relay'
import { SolanaTransfer } from 'nexus-prisma'

export const SolanaTransferMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createSolanaTransfer', {
      type: SolanaTransfer.$name,
      args: {
        amountLamport: nonNull(floatArg()),
        fromUserId: nonNull(intArg()),
        toUserId: nonNull(intArg()),
        signature: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.solanaTransfer.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('updateSolanaTransfer', {
      type: SolanaTransfer.$name,
      args: {
        id: nonNull(stringArg()),
        fromUserId: intArg(),
        toUserId: intArg(),
        signature: stringArg(),
      },
      async resolve(_, args, ctx) {
        const id = Number(fromGlobalId(args.id).id)
        let data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.solanaTransfer.update({
            where: {
              id
            },
            data
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('deleteSolanaTransfer', {
      type: SolanaTransfer.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.solanaTransfer.delete({
            where: {
              id: Number(fromGlobalId(id).id),
            },
          })
        } catch (error) {
          throw new Error(`error: ${error}`)
        }
      },
    })
  },
})