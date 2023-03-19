import { extendType, intArg, nonNull, stringArg } from 'nexus'
import dotenv from 'dotenv'
import {
  skeetSolTransfer,
  SkeetSolTransferParam,
} from '@skeet-framework/api-plugin-solana-transfer'
import { User } from '@prisma/client'
import { fromGlobalId } from 'graphql-relay'
import { getUserWallet } from '@/lib/prismaManager'
import { RPC_URL } from '@/index'
dotenv.config()

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
          return true
        } catch (error) {
          throw new Error(`walletSolanaTokenTransfer: ${error}`)
        }
      },
    })
  },
})
