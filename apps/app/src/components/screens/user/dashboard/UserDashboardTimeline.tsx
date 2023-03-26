import { useEffect, useMemo, useCallback } from 'react'
import tw from '@/lib/tailwind'
import { userState } from '@/store/user'
import { useRecoilValue } from 'recoil'
import { View, Text, Image, Pressable } from 'react-native'
import GreetingGacha from './GreetingGacha'
import { useFragment, graphql } from 'react-relay'
import { UserDashboardTimeline_query$key } from '@/__generated__/UserDashboardTimeline_query.graphql'
import { format } from 'date-fns'

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

        <View style={tw`w-full`}>
          {data.postConnection?.edges?.map((edge) => (
            <View
              key={`PostConnection${edge?.node?.id}`}
              style={tw`flex flex-col py-4 border-t border-gray-50 dark:border-gray-700`}
            >
              <View style={tw`flex flex-row items-center gap-4`}>
                <Image
                  source={{
                    uri:
                      edge?.node?.user?.iconUrl == ''
                        ? 'https://dummyimage.com/300x300/000/fff&text=USER'
                        : edge?.node?.user?.iconUrl ??
                          'https://dummyimage.com/300x300/000/fff&text=USER',
                  }}
                  alt={user.name}
                  style={tw`w-10 h-10 rounded-full`}
                />
                <Text style={tw`font-loaded-bold text-lg`}>
                  {edge?.node?.user?.name}
                </Text>
                <View style={tw`flex-grow`} />
                <Text style={tw`font-loaded-light text-xs text-right`}>
                  {format(
                    new Date(edge?.node?.createdAt),
                    'yyyy-MM-dd HH:mm:ss'
                  )}
                </Text>
              </View>
              <View style={tw`pt-3`}>
                <Text style={tw`font-loaded-normal text-lg`}>
                  {edge?.node?.body}
                </Text>
              </View>
              <View style={tw`pt-4 flex flex-row items-center gap-12`}>
                <View style={tw`flex flex-row items-center gap-4`}>
                  <Text style={tw`font-loaded-medium`}>
                    {edge?.node?.goodNum}
                  </Text>
                </View>
                <View style={tw`flex flex-row items-center gap-4`}>
                  <Text style={tw`font-loaded-medium`}>
                    {edge?.node?.greatNum}
                  </Text>
                </View>
                <View style={tw`flex flex-row items-center gap-4`}>
                  <Text style={tw`font-loaded-medium`}>
                    {edge?.node?.awesomeNum}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  )
}
