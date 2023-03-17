import { extendType, nonNull, stringArg, intArg, floatArg } from 'nexus'
import { fromGlobalId } from 'graphql-relay'
import { Post } from 'nexus-prisma'

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: Post.$name,
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
        userId: intArg(),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.post.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('updatePost', {
      type: Post.$name,
      args: {
        id: nonNull(stringArg()),
        body: stringArg(),
        userId: intArg(),
      },
      async resolve(_, args, ctx) {
        const id = Number(fromGlobalId(args.id).id)
        let data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.post.update({
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
    t.field('deletePost', {
      type: Post.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.post.delete({
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
