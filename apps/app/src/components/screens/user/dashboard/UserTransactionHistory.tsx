import { useMemo } from 'react'
import tw from '@/lib/tailwind'
import { userState } from '@/store/user'
import { useRecoilValue } from 'recoil'
import { View, Text, Image } from 'react-native'
import { useFragment, graphql } from 'react-relay'
import { UserTransactionHistory_user$key } from '@/__generated__/UserTransactionHistory_user.graphql'
import { format } from 'date-fns'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

const fragment = graphql`
  fragment UserTransactionHistory_user on User {
    toTransfers {
      id
      amountLamport
      signature
      fromUser {
        id
        name
        iconUrl
      }
      toUser {
        id
        name
        iconUrl
      }
    }
    fromTransfers {
      id
      amountLamport
      signature
      fromUser {
        id
        name
        iconUrl
      }
      toUser {
        id
        name
        iconUrl
      }
    }
  }
`

type Props = {
  refetch: () => void
  userQuery: UserTransactionHistory_user$key
}

export default function UserTransactionHistory({ refetch, userQuery }: Props) {
  const user = useRecoilValue(userState)

  const hasWallet = useMemo(
    () => user.wallet.pubkey != null && user.wallet.pubkey != '',
    [user.wallet]
  )

  const data = useFragment(fragment, userQuery)
  console.log(data)

  const timesList = useMemo(() => {
    let goodTimes = 0
    let greatTimes = 0
    let awesomeTimes = 0
    let greetingTimes = 0
    data.fromTransfers.forEach((item) => {
      if (item.amountLamport / LAMPORTS_PER_SOL == 0.2) {
        goodTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.3) {
        greatTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.5) {
        awesomeTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.8) {
        greetingTimes++
      }
    })
    data.toTransfers.forEach((item) => {
      if (item.amountLamport / LAMPORTS_PER_SOL == 0.2) {
        goodTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.3) {
        greatTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.5) {
        awesomeTimes++
      }
    })
    return [
      {
        emoji: '👋',
        times: greetingTimes,
      },
      {
        emoji: '🤝',
        times: goodTimes,
      },
      {
        emoji: '🙌',
        times: greatTimes,
      },
      {
        emoji: '🚀',
        times: awesomeTimes,
      },
    ]
  }, [data])

  if (!hasWallet) {
    return null
  }

  return (
    <>
      <View style={tw`max-w-xs py-12`}>
        <View
          style={tw`w-full px-6 py-3 bg-gray-50 dark:bg-gray-700 flex flex-row items-center justify-center flex-wrap sm:flex-nowrap gap-12`}
        >
          {timesList.map((item) => (
            <View
              style={tw`flex flex-col items-center justify-center gap-2`}
              key={`PriceListItem${item.emoji}`}
            >
              <Text style={tw`text-2xl`}>{item.emoji}</Text>
              <Text
                style={tw`font-loaded-bold text-base tracking-tight text-gray-900 dark:text-white`}
              >
                {item.times.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={tw`w-full pb-24`}></View>
      </View>
    </>
  )
}
