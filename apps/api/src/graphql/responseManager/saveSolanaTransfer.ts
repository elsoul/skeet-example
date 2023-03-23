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
        workerUrl: stringArg(),
        projectId: stringArg(),
        taskLocation: stringArg(),
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
