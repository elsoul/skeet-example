import { extendType, intArg, nonNull, stringArg } from 'nexus'
import dotenv from 'dotenv'
import {
  skeetSolTransfer,
  SkeetSolTransferParam,
} from '@skeet-framework/api-plugin-solana-transfer'
import { PrismaClient, User } from '@prisma/client'
import { fromGlobalId } from 'graphql-relay'
import { getUserWallet } from '@/lib/prismaManager'
import { RPC_URL } from '@/index'
dotenv.config()

const prisma = new PrismaClient()

export const walletSolanaTokenTransfer = extendType({
  type: 'Query',
  definition(t) {
    t.field('walletSolanaTokenTransfer', {
      type: 'Boolean',
      args: {
        toUserId: nonNull(stringArg()),
        transferAmountLamport: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        try {
          const user: User = ctx.user
          const fromUserWallet = await getUserWallet(user.id)
          const toUserIdInt = Number(fromGlobalId(args.toUserId).id)
          const toUserWallet = await getUserWallet(toUserIdInt)
          const skeetSolTransferParam: SkeetSolTransferParam = {
            toAddressPubkey: toUserWallet.pubkey,
            transferAmountLamport: args.transferAmountLamport,
            encodedFromSecretKeyString: fromUserWallet.privateKey,
            iv: fromUserWallet.iv.toString('base64'),
            rpcUrl: RPC_URL,
          }
          await skeetSolTransfer(skeetSolTransferParam)
          const solanaTransfer = await createSolanaTransfer(
            args.transferAmountLamport,
            user.id,
            toUserIdInt
          )
          skeetSolTransferParam.id = solanaTransfer.id
          await skeetSolTransfer(skeetSolTransferParam)
          return true
        } catch (error) {
          throw new Error(`walletSolanaTokenTransfer: ${error}`)
        }
      },
    })
  },
})

export const createSolanaTransfer = async (
  amountLamport: number,
  fromUserId: number,
  toUserId: number,
  signature: string = ''
) => {
  const solanaTransfer = await prisma.solanaTransfer.create({
    data: {
      amountLamport,
      fromUser: {
        connect: { id: fromUserId },
      },
      toUser: {
        connect: { id: toUserId },
      },
      signature,
    },
  })
  return solanaTransfer
}
