import { extendType, intArg, stringArg } from 'nexus'
import dotenv from 'dotenv'
import {
  skeetSolTransfer,
  SkeetSolTransferParam,
} from '@skeet-framework/api-plugin-solana-transfer'
import { User } from '@prisma/client'
import { getUserWithWallet, UserWithWallets } from '@/lib/prismaManager'
import { RPC_URL } from '@/index'
import { createSolanaTransfer } from '@/lib/solanaUtils'

dotenv.config()

export const greetingGacha = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('greetingGacha', {
      type: 'Boolean',
      args: {
        content: stringArg(),
        transferAmountLamport: intArg(),
      },
      async resolve(_, args, ctx) {
        try {
          if (!args.content || !args.transferAmountLamport)
            throw new Error('Invalid Args')

          const user: User = ctx.user
          console.log(user)
          const fromUserWallet = await getUserWithWallet(user.id)
          const toUserIdInt = 1
          const toUserWallet: UserWithWallets = await getUserWithWallet(
            toUserIdInt
          )
          const skeetSolTransferParam: SkeetSolTransferParam = {
            workerUrl: process.env.SOLANA_TRANSFER || '',
            projectId: process.env.SKEET_GCP_PROJECT_ID || '',
            taskLocation: process.env.SKEET_GCP_TASK_REGION || '',
            toAddressPubkey: toUserWallet.userWallets[0].pubkey,
            transferAmountLamport: args.transferAmountLamport,
            encodedFromSecretKeyString:
              fromUserWallet.userWallets[0].privateKey,
            iv: fromUserWallet.userWallets[0].iv.toString('base64'),
            rpcUrl: RPC_URL,
          }

          console.log(`here; ${JSON.stringify(skeetSolTransferParam)}`)
          const solanaTransfer = await createSolanaTransfer(
            args.transferAmountLamport,
            user.id,
            toUserIdInt
          )
          console.log(solanaTransfer)
          skeetSolTransferParam.id = solanaTransfer.id
          await skeetSolTransfer(skeetSolTransferParam)
          await ctx.prisma.post.create({
            data: {
              title: args.content,
              body: args.content,
              userId: user.id,
            },
          })
          return true
        } catch (error) {
          console.log(`greetingGacha: ${error}`)
          throw new Error(`greetingGacha: ${error}`)
        }
      },
    })
  },
})
