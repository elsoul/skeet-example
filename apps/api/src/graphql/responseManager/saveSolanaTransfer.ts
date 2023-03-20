import { extendType, floatArg, intArg, nonNull, stringArg } from 'nexus'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const saveSkeetSolanaTransfer = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('saveSkeetSolanaTransfer', {
      type: 'Boolean',
      args: {
        id: intArg(),
        toAddressPubkey: nonNull(stringArg()),
        fromAddressPubkey: nonNull(stringArg()),
        transferAmountLamport: nonNull(intArg()),
        tokenMintAddress: nonNull(stringArg()),
        signature: nonNull(stringArg()),
        usdcPrice: nonNull(floatArg()),
        timestamp: stringArg(),
      },
      async resolve(_, args, _ctx) {
        try {
          console.log(
            `saveSkeetSolanaTransfer: ${JSON.stringify(args, null, 2)}`
          )
          const solanaTransfer = await updateSolanaTransfer(
            args.id || 0,
            args.signature
          )
          console.log(solanaTransfer)
          return true
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
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
