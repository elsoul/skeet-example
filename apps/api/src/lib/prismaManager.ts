import { PrismaClient } from '@prisma/client'
import { connection } from '..'
import { decrypt } from './crypto'
import { getBalance, getKeypairFromArrayString } from './solanaUtils'

const prisma = new PrismaClient()

export const getUserWithWallet = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        userWallets: true,
      },
    })
    if (!user)
      throw new Error(`getUserWithWallet: No User Data!Check your Database!`)
    return user
  } catch (error) {
    throw new Error(`getUserWithWallet: ${error}`)
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
