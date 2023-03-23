import { extendType, floatArg, intArg, stringArg } from 'nexus'
import { PrismaClient } from '@prisma/client'
import {
  getUserWalletByPubkey,
  updateUserWalletBalance,
} from '@/lib/prismaManager'
const prisma = new PrismaClient()

export const saveSkeetSolanaTransfer = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('saveSkeetSolanaTransfer', {
      type: 'Boolean',
      args: {
        id: intArg(),
        toAddressPubkey: stringArg(),
        fromAddressPubkey: stringArg(),
        transferAmountLamport: intArg(),
        tokenMintAddress: stringArg(),
        signature: stringArg(),
        usdcPrice: floatArg(),
        timestamp: stringArg(),
      },
      async resolve(_, args, ctx) {
        try {
          console.log(
            `saveSkeetSolanaTransfer: ${JSON.stringify(args, null, 2)}`
          )
          const solanaTransfer = await updateSolanaTransfer(
            Number(args.id) || 0,
            args.signature || ''
          )
          console.log(solanaTransfer)
          if (!args.fromAddressPubkey) throw new Error('no from pubkey!')
          const fromUserWallet = await getUserWalletByPubkey(
            args.fromAddressPubkey
          )
          await updateUserWalletBalance(fromUserWallet.id)
          if (!args.toAddressPubkey) throw new Error('no to pubkey!')
          const toUserWallet = await getUserWalletByPubkey(args.toAddressPubkey)
          await updateUserWalletBalance(toUserWallet.id)
          return true
        } catch (error) {
          console.log(`saveSkeetSolanaTransfer: ${error}`)
          throw new Error(`saveSkeetSolanaTransfer: ${error}`)
        }
      },
    })
  },
})

export const updateSolanaTransfer = async (id: number, signature: string) => {
  const solanaTransfer = await prisma.solanaTransfer.update({
    where: { id },
    data: {
      signature,
    },
  })
  return solanaTransfer
}
