import { useEffect, useMemo, useCallback } from 'react'
import tw from '@/lib/tailwind'
import { userState } from '@/store/user'
import { useRecoilValue } from 'recoil'
import { View, Text, Image, Pressable } from 'react-native'
import GreetingGacha from './GreetingGacha'
import { useFragment, graphql } from 'react-relay'
import { UserDashboardTimeline_query$key } from '@/__generated__/UserDashboardTimeline_query.graphql'

const priceList = [
  {
    emoji: '👋',
    price: '0.8 SOL',
  },
  {
    emoji: '🤝',
    price: '0.2 SOL',
  },
  {
    emoji: '🙌',
    price: '0.3 SOL',
  },
  {
    emoji: '🚀',
    price: '0.5 SOL',
  },
]

const fragment = graphql`
  fragment UserDashboardTimeline_query on Query {
    postConnection(first: 20) {
      edges {
        node {
          id
          title
          body
          createdAt
          goodNum
          greatNum
          awesomeNum
          user {
            id
            name
            iconUrl
          }
        }
      }
    }
  }
`

type Props = {
  refetch: () => void
  query: UserDashboardTimeline_query$key
}

export default function UserDashboardTimeline({ refetch, query }: Props) {
  const user = useRecoilValue(userState)

  const hasWallet = useMemo(
    () => user.wallet.pubkey != null && user.wallet.pubkey != '',
    [user.wallet]
  )

  const data = useFragment(fragment, query)
  console.log(data)

  return (
    <>
      <View style={tw`max-w-md`}>
        <View
          style={tw`w-full px-6 py-3 bg-gray-50 dark:bg-gray-700 flex flex-row items-center justify-center flex-wrap sm:flex-nowrap gap-6`}
        >
          {priceList.map((item) => (
            <View
              style={tw`flex flex-row items-center justify-center gap-2`}
              key={`PriceListItem${item.emoji}`}
            >
              <Text style={tw`text-2xl`}>{item.emoji}</Text>
              <Text
                style={tw`font-loaded-bold text-base tracking-tight text-gray-900 dark:text-white`}
              >
                {item.price}
              </Text>
            </View>
          ))}
        </View>
        {hasWallet && (
          <View style={tw`w-full`}>
            <GreetingGacha refetch={refetch} />
          </View>
        )}

        <View style={tw`w-full`}></View>
      </View>
    </>
  )
}
