import { extendType, stringArg } from 'nexus'
import dotenv from 'dotenv'
import {
  skeetSolTransfer,
  SkeetSolTransferParam,
} from '@skeet-framework/api-plugin-solana-transfer'
import { User } from '@prisma/client'
import { getUserWithWallet, UserWithWallets } from '@/lib/prismaManager'
import { RPC_URL } from '@/index'
import { createSolanaTransfer } from '@/lib/solanaUtils'
import { fromGlobalId } from 'graphql-relay'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

dotenv.config()

export const sendGood = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('sendGood', {
      type: 'Boolean',
      args: {
        postId: stringArg(),
        toUserId: stringArg(),
      },
      async resolve(_, args, ctx) {
        try {
          if (!args.toUserId || !args.postId) throw new Error('Invalid Args')

          const user: User = ctx.user
          const fromUserWallet = await getUserWithWallet(user.id)
          console.log(args.toUserId)
          const toUserId = fromGlobalId(args.toUserId)
          const toUserIdInt = Number(toUserId.id)
          console.log(toUserIdInt)
          const toUserWallet: UserWithWallets = await getUserWithWallet(
            toUserIdInt
          )
          console.log(toUserWallet)
          const transferAmountLamport = 0.2 * LAMPORTS_PER_SOL
          const skeetSolTransferParam: SkeetSolTransferParam = {
            workerUrl: process.env.SOLANA_TRANSFER || '',
            projectId: process.env.SKEET_GCP_PROJECT_ID || '',
            taskLocation: process.env.SKEET_GCP_TASK_REGION || '',
            toAddressPubkey: toUserWallet.userWallets[0].pubkey,
            transferAmountLamport,
            encodedFromSecretKeyString:
              fromUserWallet.userWallets[0].privateKey,
            iv: fromUserWallet.userWallets[0].iv.toString('base64'),
            rpcUrl: RPC_URL,
          }

          console.log(`here; ${JSON.stringify(skeetSolTransferParam)}`)
          const solanaTransfer = await createSolanaTransfer(
            transferAmountLamport,
            user.id,
            toUserIdInt
          )
          console.log(solanaTransfer)
          skeetSolTransferParam.id = solanaTransfer.id
          await skeetSolTransfer(skeetSolTransferParam)
          const postId = fromGlobalId(args.postId)
          const postIdInt = Number(postId.id)
          await ctx.prisma.post.update({
            where: {
              id: postIdInt,
            },
            data: {
              goodNum: { increment: 1 },
            },
          })
          return true
        } catch (error) {
          console.log(`sendGood: ${error}`)
          throw new Error(`sendGood: ${error}`)
        }
      },
    })
  },
})
