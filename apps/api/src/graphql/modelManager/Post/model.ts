import { objectType } from 'nexus'
import { Post } from 'nexus-prisma'

export const PostObject = objectType({
  name: Post.$name,
  description: Post.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(Post.title)
    t.field(Post.body)
    t.field(Post.createdAt)
    t.field(Post.updatedAt)
    t.field(Post.userId)
  },
})