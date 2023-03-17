import { objectType } from 'nexus'
import { UserWallets } from 'nexus-prisma'

export const UserWalletsObject = objectType({
  name: UserWallets.$name,
  description: UserWallets.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(UserWallets.name)
    t.field(UserWallets.chainType)
    t.field(UserWallets.imgUrl)
    t.field(UserWallets.pubkey)
    t.field(UserWallets.privateKey)
    t.field(UserWallets.priority)
    t.field(UserWallets.sol)
    t.field(UserWallets.usdc)
    t.field(UserWallets.epct)
    t.field(UserWallets.createdAt)
    t.field(UserWallets.updatedAt)
    t.field(UserWallets.userId)
  },
})