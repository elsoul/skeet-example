import { useMemo } from 'react'
import tw from '@/lib/tailwind'
import { userState } from '@/store/user'
import { useRecoilValue } from 'recoil'
import { View, Text, Image } from 'react-native'
import GreetingGacha from './GreetingGacha'
import { useFragment, graphql } from 'react-relay'
import { UserDashboardTimeline_postConnection$key } from '@/__generated__/UserDashboardTimeline_postConnection.graphql'
import { format } from 'date-fns'
import GoodButton from './GoodButton'
import AwesomeButton from './AwesomeButton'
import GreatButton from './GreatButton'
import EmptyRecords from '@/components/empty/EmptyRecords'

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
  fragment UserDashboardTimeline_postConnection on QueryPostConnection_Connection {
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
`

type Props = {
  refetch: () => void
  postConnection: UserDashboardTimeline_postConnection$key
}

export default function UserDashboardTimeline({
  refetch,
  postConnection,
}: Props) {
  const user = useRecoilValue(userState)

  const hasWallet = useMemo(
    () => user.wallet.pubkey != null && user.wallet.pubkey != '',
    [user.wallet]
  )

  const data = useFragment(fragment, postConnection)
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
          <View style={tw`w-full flex`}>
            <GreetingGacha refetch={refetch} />
          </View>
        )}

        <View style={tw`w-full pb-24`}>
          {data.edges?.length == 0 && <EmptyRecords />}
          {data.edges?.map((edge) => (
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
                <Text
                  style={tw`font-loaded-bold text-lg text-gray-900 dark:text-white`}
                >
                  {edge?.node?.user?.name}
                </Text>
                <View style={tw`flex-grow`} />
                <Text
                  style={tw`font-loaded-light text-xs text-right text-gray-700 dark:text-gray-100`}
                >
                  {format(
                    new Date(edge?.node?.createdAt),
                    'yyyy-MM-dd HH:mm:ss'
                  )}
                </Text>
              </View>
              <View style={tw`pt-3`}>
                <Text
                  style={tw`font-loaded-normal text-lg text-gray-900 dark:text-white`}
                >
                  {edge?.node?.body}
                </Text>
              </View>
              <View style={tw`pt-4 flex flex-row items-center gap-10`}>
                <View style={tw`flex flex-row items-center gap-3`}>
                  {edge?.node?.id && edge?.node?.user?.id && (
                    <GoodButton
                      refetch={refetch}
                      name={edge?.node?.user?.name}
                      postId={edge?.node?.id}
                      toUserId={edge?.node?.user?.id}
                    />
                  )}
                  <Text
                    style={tw`font-loaded-medium text-gray-900 dark:text-white`}
                  >
                    {edge?.node?.goodNum.toLocaleString()}
                  </Text>
                </View>
                <View style={tw`flex flex-row items-center gap-3`}>
                  {edge?.node?.id && edge?.node?.user?.id && (
                    <GreatButton
                      refetch={refetch}
                      name={edge?.node?.user?.name}
                      postId={edge?.node?.id}
                      toUserId={edge?.node?.user?.id}
                    />
                  )}
                  <Text
                    style={tw`font-loaded-medium text-gray-900 dark:text-white`}
                  >
                    {edge?.node?.greatNum.toLocaleString()}
                  </Text>
                </View>
                <View style={tw`flex flex-row items-center gap-3`}>
                  {edge?.node?.id && edge?.node?.user?.id && (
                    <AwesomeButton
                      refetch={refetch}
                      name={edge?.node?.user?.name}
                      postId={edge?.node?.id}
                      toUserId={edge?.node?.user?.id}
                    />
                  )}
                  <Text
                    style={tw`font-loaded-medium text-gray-900 dark:text-white`}
                  >
                    {edge?.node?.awesomeNum.toLocaleString()}
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
