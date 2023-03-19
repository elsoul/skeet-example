import { extendType, intArg, nonNull, stringArg } from 'nexus'
import { UserWallets } from '@prisma/client'
import dotenv from 'dotenv'
import {
  skeetSplTransfer,
  SkeetSplTransferParam,
} from '@skeet-framework/api-plugin-solana-transfer'
dotenv.config()

export const solanaTokenTransfer = extendType({
  type: 'Query',
  definition(t) {
    t.field('solanaTokenTransfer', {
      type: 'Boolean',
      args: {
        toAddressPubkey: nonNull(stringArg()),
        transferAmountLamport: nonNull(intArg()),
        tokenMintAddress: nonNull(stringArg()),
        encodedFromSecretKeyString: nonNull(stringArg()),
        iv: nonNull(stringArg()),
        rpcUrl: nonNull(stringArg()),
        decimal: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        const skeetSplTransferParam: SkeetSplTransferParam = args
        await skeetSplTransfer(skeetSplTransferParam)
        return true
      },
    })
  },
})
