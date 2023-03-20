import { extendType, nonNull, stringArg, intArg, floatArg } from 'nexus'
import { fromGlobalId } from 'graphql-relay'
import { UserWallets } from 'nexus-prisma'

export const UserWalletsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUserWallets', {
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
          return await ctx.prisma.userWallets.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('updateUserWallets', {
      type: UserWallets.$name,
      args: {
        id: nonNull(stringArg()),
        chainType: stringArg(),
        imgUrl: stringArg(),
        pubkey: stringArg(),
        privateKey: stringArg(),
        priority: intArg(),
        sol: floatArg(),
        usdc: floatArg(),
        epct: floatArg(),
        userId: intArg(),
      },
      async resolve(_, args, ctx) {
        const id = Number(fromGlobalId(args.id).id)
        const data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.userWallets.update({
            where: {
              id,
            },
            data,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('deleteUserWallets', {
      type: UserWallets.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.userWallets.delete({
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
