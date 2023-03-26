import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray, fromGlobalId } from 'graphql-relay'
import { Post } from 'nexus-prisma'

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('postConnection', {
      type: Post.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(
          await ctx.prisma.post.findMany({ orderBy: { createdAt: 'desc' } }),
          args
        )
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.post.count()
          },
        })
      },
    })
    t.field('getPost', {
      type: Post.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.post.findUnique({
          where: {
            id: Number(fromGlobalId(id).id),
          },
        })
      },
    })
  },
})
