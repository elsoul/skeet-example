import { extendType, nonNull, stringArg, intArg, floatArg } from 'nexus'
import { fromGlobalId } from 'graphql-relay'
import { User } from 'nexus-prisma'

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: User.$name,
      args: {
        uid: nonNull(stringArg()),
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        iconUrl: stringArg(),
        role: stringArg(),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.user.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('updateUser', {
      type: User.$name,
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        email: stringArg(),
        iconUrl: stringArg(),
        role: stringArg(),
      },
      async resolve(_, args, ctx) {
        const id = Number(fromGlobalId(args.id).id)
        let data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.user.update({
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
    t.field('deleteUser', {
      type: User.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.user.delete({
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