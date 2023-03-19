import { extendType } from 'nexus'
import { getAirdrop, getKeypairFromArrayString } from '@/lib/solanaUtils'
import { decrypt } from '@/lib/crypto'
import { User } from '@prisma/client'
import { getUserWallet, updateUserWalletBalance } from '@/lib/prismaManager'
import { connection } from '@/index'
import { UserWallets } from 'nexus-prisma'
import { sleep } from '@/utils/time'

export const airdrop = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('airdrop', {
      type: UserWallets.$name,
      args: {},
      async resolve(_, _args, ctx) {
        try {
          const user: User = ctx.user
          let userWallet = await getUserWallet(user.id)

          const keypair = await getKeypairFromArrayString(
            await decrypt(userWallet.privateKey, userWallet.iv)
          )
          await getAirdrop(connection, keypair)
          await sleep(1000)
          userWallet = await updateUserWalletBalance(userWallet.id)
          return userWallet
        } catch (error) {
          console.log(error)
          throw new Error(`createWallet: ${error}`)
        }
      },
    })
  },
})
