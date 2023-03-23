import { extendType, intArg, nonNull, stringArg } from 'nexus'
import dotenv from 'dotenv'
import {
  skeetSolTransfer,
  SkeetSolTransferParam,
} from '@skeet-framework/api-plugin-solana-transfer'
import { User } from '@prisma/client'
import { fromGlobalId } from 'graphql-relay'
import { getUserWithWallet, UserWithWallets } from '@/lib/prismaManager'
import { RPC_URL } from '@/index'
import { createSolanaTransfer } from '@/lib/solanaUtils'
dotenv.config()

export const walletSolanaTokenTransfer = extendType({
  type: 'Mutation',
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
          const fromUserWallet = await getUserWithWallet(user.id)
          const toUserIdInt = Number(fromGlobalId(args.toUserId).id)
          const toUserWallet: UserWithWallets = await getUserWithWallet(
            toUserIdInt
          )
          console.log(fromUserWallet)
          const skeetSolTransferParam: SkeetSolTransferParam = {
            workerUrl: process.env.SOLANA_TRANSFER || '',
            projectId: process.env.SKEET_GCP_PROJECT || '',
            taskLocation: process.env.SKEET_GCP_TASK_REGION || '',
            toAddressPubkey: toUserWallet.userWallets[0].pubkey,
            transferAmountLamport: args.transferAmountLamport,
            encodedFromSecretKeyString:
              fromUserWallet.userWallets[0].privateKey,
            iv: fromUserWallet.userWallets[0].iv.toString('base64'),
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
