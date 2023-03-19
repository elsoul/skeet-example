import { useEffect, useMemo } from 'react'
import { UserDashboardStatus_query$key } from '@/__generated__/UserDashboardStatus_query.graphql'
import { useFragment, graphql } from 'react-relay'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import { View } from 'react-native'
import tw from '@/lib/tailwind'

const fragment = graphql`
  fragment UserDashboardStatus_query on Query {
    userWalletsConnection(first: 1) {
      edges {
        node {
          pubkey
          sol
        }
      }
    }
  }
`

type Props = {
  refetch: () => void
  query: UserDashboardStatus_query$key
}

export default function UserDashboardStatus({ refetch, query }: Props) {
  const [user, setUser] = useRecoilState(userState)

  const data = useFragment(fragment, query)
  useEffect(() => {
    if (
      data.userWalletsConnection?.edges &&
      data.userWalletsConnection?.edges?.length > 0 &&
      data.userWalletsConnection.edges[0]?.node?.pubkey !== user.wallet.pubkey
    ) {
      setUser({
        ...user,
        wallet: {
          pubkey: data.userWalletsConnection.edges[0]?.node?.pubkey ?? '',
          sol: data.userWalletsConnection.edges[0]?.node?.sol ?? 0,
        },
      })
    }
  }, [data.userWalletsConnection, setUser, user])

  const hasWallet = useMemo(
    () => user.wallet.pubkey != null && user.wallet.pubkey != '',
    [user.wallet]
  )

  console.log(hasWallet)

  return (
    <>
      <View style={tw``}></View>
    </>
  )
}
