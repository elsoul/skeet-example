import { PrismaClient } from '@prisma/client'
import { decodedKey, encodeJWT } from '@/lib/jsonWebToken'
import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { User } from 'nexus-prisma'
import { auth } from 'firebase-admin'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import admin from 'firebase-admin'

admin.initializeApp()
const prisma = new PrismaClient()

export type UnknownUser = {
  user: {
    id: string
    name: string
    email: string
    iconUrl: string
  }
}

export const unknownUser: UnknownUser = {
  user: {
    id: '',
    name: '',
    email: '',
    iconUrl: '',
  },
}

export const LoginResponse = objectType({
  name: 'LoginResponse',
  definition(t) {
    t.string('token')
  },
})

export const LOGIN_EXPIRATION = '7d'

export const login = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: LoginResponse,
      args: {
        token: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        try {
          const decodedUser: DecodedIdToken = await auth().verifyIdToken(
            args.token
          )
          const user: User = await ctx.prisma.user.findUnique({
            where: {
              uid: decodedUser.uid,
            },
          })
          let token = ''
          if (user !== null) {
            console.log('logged in!')
            token = await encodeJWT(String(user.id), LOGIN_EXPIRATION)
          } else {
            const user = await ctx.prisma.user.create({
              data: {
                uid: decodedUser.uid,
                name: decodedUser.name,
                email: decodedUser.email,
                iconUrl: decodedUser.picture,
              },
            })
            console.log('created new user!')
            console.log(user)
            token = await encodeJWT(String(user.id), LOGIN_EXPIRATION)
          }
          if (!token) throw new Error('Invalid Token!')
          return { token }
        } catch (error) {
          console.log(`login: ${error}`)
          return { token: 'Invalid Token!' }
        }
      },
    })
  },
})

export const getLoginUser = async (token: string) => {
  try {
    const bearer = token.split('Bearer ')[1]
    if (!bearer) return unknownUser
    const userId = Number(await decodedKey(bearer))
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (user) {
      return user
    } else {
      return unknownUser
    }
  } catch (error) {
    return unknownUser
  }
}
