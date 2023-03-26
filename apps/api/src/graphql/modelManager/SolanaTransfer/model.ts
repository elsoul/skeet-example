import { objectType } from 'nexus'
import { SolanaTransfer } from 'nexus-prisma'

export const SolanaTransferObject = objectType({
  name: SolanaTransfer.$name,
  description: SolanaTransfer.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(SolanaTransfer.amountLamport)
    t.field(SolanaTransfer.fromUser)
    t.field(SolanaTransfer.toUser)
    t.field(SolanaTransfer.signature)
    t.field(SolanaTransfer.createdAt)
    t.field(SolanaTransfer.updatedAt)
  },
})
