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

export const userDashboardQuery = graphql`
  query UserDashboardQuery {
    me {
      uid
      name
      email
      iconUrl
    }
    ...UserDashboardStatus_query
  }
`

type Props = {
  queryReference: PreloadedQuery<UserDashboardQuery, Record<string, unknown>>
  refetch: () => void
}

export default function UserDashboard({ queryReference, refetch }: Props) {
  const [user, setUser] = useRecoilState(userState)

  const data = usePreloadedQuery(userDashboardQuery, queryReference)

  useEffect(() => {
    if (
      user.skeetToken != '' &&
      data.me &&
      data.me.uid &&
      user.uid == '' &&
      user.uid !== data.me.uid
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

  return (
    <>
      <Container>
        <View
          style={tw`flex flex-col md:flex-row items-center justify-center gap-24`}
        >
          <View style={tw``}>
            <UserDashboardStatus refetch={refetch} query={data} />
          </View>
          <View style={tw`grow`}>
            <UserDashboardTimeline refetch={refetch} />
          </View>
        </View>
      </Container>
    </>
  )
}
