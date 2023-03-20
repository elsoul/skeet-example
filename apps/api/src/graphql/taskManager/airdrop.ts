import { extendType } from 'nexus'
import { getAirdrop, getKeypairFromArrayString } from '@/lib/solanaUtils'
import { decrypt } from '@/lib/crypto'
import { UserWallets as UserWalletsType } from 'nexus-prisma'
import { getUserWithWallet, updateUserWalletBalance } from '@/lib/prismaManager'
import { connection } from '@/index'
import { sleep } from '@/utils/time'
import { User } from '@prisma/client'

export const airdrop = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('airdrop', {
      type: UserWalletsType.$name,
      args: {},
      async resolve(_, _args, ctx) {
        try {
          const user: User = ctx.user
          console.log(user)
          const userWallet = await getUserWithWallet(user.id)
          console.log(userWallet)
          const keypair = await getKeypairFromArrayString(
            await decrypt(
              userWallet.userWallets[0].privateKey,
              userWallet.userWallets[0].iv
            )
          )
          await getAirdrop(connection, keypair)
          await sleep(1000)
          const result = await updateUserWalletBalance(
            userWallet.userWallets[0].id
          )
          return result
        } catch (error) {
          console.log(error)
          throw new Error(`airdrop: ${error}`)
        }
      },
    })
  },
})
