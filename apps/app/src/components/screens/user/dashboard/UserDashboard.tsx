import { useEffect } from 'react'
import { graphql, usePreloadedQuery } from 'react-relay'
import type { UserDashboardQuery } from '@/__generated__/UserDashboardQuery.graphql'
import type { PreloadedQuery } from 'react-relay'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import Container from '@/components/common/atoms/Container'
import { View } from 'react-native'
import tw from '@/lib/tailwind'
import UserDashboardStatus from './UserDashboardStatus'
import UserDashboardTimeline from './UserDashboardTimeline'
import UserTransactionHistory from './UserTransactionHistory'

export const userDashboardQuery = graphql`
  query UserDashboardQuery {
    me {
      uid
      name
      email
      iconUrl
      userWallets {
        pubkey
        sol
      }
      ...UserTransactionHistory_user
    }
    postConnection(first: 20) {
      ...UserDashboardTimeline_postConnection
    }
  }
`

type Props = {
  queryReference: PreloadedQuery<UserDashboardQuery, Record<string, unknown>>
  refetch: () => void
}

export default function UserDashboard({ queryReference, refetch }: Props) {
  const [user, setUser] = useRecoilState(userState)

  const data = usePreloadedQuery(userDashboardQuery, queryReference)
  console.log(data)

  useEffect(() => {
    if (
      user.skeetToken != '' &&
      data.me &&
      data.me.uid &&
      data.me.uid != '' &&
      (user.uid !== data.me.uid ||
        user.email !== data.me.email ||
        user.name !== data.me.name ||
        user.iconUrl !== data.me.iconUrl)
    ) {
      setUser({
        ...user,
        uid: data.me.uid,
        email: data.me.email,
        name: data.me.name,
        iconUrl: data.me.iconUrl ?? '',
      })
    }
  }, [data.me, setUser, user])

  useEffect(() => {
    if (
      user.skeetToken != '' &&
      data.me &&
      data.me.uid &&
      data.me.uid != '' &&
      data.me.userWallets.length > 0 &&
      (user.wallet.pubkey !== data.me.userWallets[0]?.pubkey ||
        user.wallet.sol !== data.me.userWallets[0]?.sol)
    ) {
      setUser({
        ...user,
        wallet: {
          pubkey: data.me.userWallets[0]?.pubkey ?? '',
          sol: data.me.userWallets[0]?.sol ?? '',
        },
      })
    }
  }, [data.me, user, setUser])

  return (
    <>
      <Container>
        <View
          style={tw`flex flex-col md:flex-row items-center md:items-start justify-center gap-24 w-full h-full`}
        >
          <View style={tw`flex flex-col`}>
            <View style={tw`flex`}>
              <UserDashboardStatus refetch={refetch} />
            </View>

            <View style={tw`flex`}>
              {data.me && (
                <UserTransactionHistory refetch={refetch} userQuery={data.me} />
              )}
            </View>
          </View>
          <View style={tw`flex`}>
            {data.postConnection && (
              <UserDashboardTimeline
                refetch={refetch}
                postConnection={data.postConnection}
              />
            )}
          </View>
        </View>
      </Container>
    </>
  )
}
