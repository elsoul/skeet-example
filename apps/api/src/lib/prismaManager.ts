import { PrismaClient, User, UserWallets } from '@prisma/client'
import { connection } from '..'
import { decrypt } from './crypto'
import { getBalance, getKeypairFromArrayString } from './solanaUtils'

const prisma = new PrismaClient()

export interface UserWithWallets extends User {
  userWallets: UserWallets[]
}

export const getUserWithWallet: (
  id: number
) => Promise<UserWithWallets> = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        userWallets: {
          orderBy: { priority: 'asc' },
          take: 1,
        },
      },
    })
    if (!user) throw new Error('user not found')
    const result: UserWithWallets = user
    return result
  } catch (error) {
    const result: UserWithWallets = {
      id: 0,
      uid: '',
      name: '',
      email: '',
      iconUrl: '',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
      userWallets: [],
    }
    return result
  }
}

export const getUserWallet = async (userWalletsId: number) => {
  try {
    const userWallet = await prisma.userWallets.findUnique({
      where: {
        id: userWalletsId,
      },
    })
    if (!userWallet)
      throw new Error(
        `getUserWallet: No getUserWallet Data!Check your Database!`
      )
    return userWallet
  } catch (error) {
    throw new Error(`getUserWallet: ${error}`)
  }
}

export const getUserWalletByPubkey = async (pubkey: string) => {
  const result = await prisma.userWallets.findMany({
    where: {
      pubkey,
    },
  })
  return result[0]
}

export const updateUserWalletBalance = async (userWalletsId: number) => {
  let userWallet = await getUserWallet(userWalletsId)

  const keypair = await getKeypairFromArrayString(
    await decrypt(userWallet.privateKey, userWallet.iv)
  )
  const balance = await getBalance(connection, keypair)
  userWallet = await prisma.userWallets.update({
    where: {
      id: userWalletsId,
    },
    data: {
      sol: balance,
    },
  })
  return userWallet
}

// const run = async () => {
//   console.log(await getUserWithWallet(1))
// }
// run()
