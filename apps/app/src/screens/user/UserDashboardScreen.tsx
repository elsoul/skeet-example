import { useCallback, useEffect } from 'react'
import UserLayout from '@/layouts/user/UserLayout'
import useColorModeRefresh from '@/hooks/useColorModeRefresh'
import useAnalytics from '@/hooks/useAnalytics'
import { Suspense } from 'react'
import DashboardLoading from '@/components/loading/DashboardLoading'
import useSessionError from '@/hooks/useSessionError'
import ShowRetryDashboard from '@/components/error/user/dashboard/ShowRetryDashboard'
import { useQueryLoader } from 'react-relay'
import type { UserDashboardQuery } from '@/__generated__/UserDashboardQuery.graphql'
import UserDashboard, {
  userDashboardQuery,
} from '@/components/screens/user/dashboard/UserDashboard'
import DashboardErrorBoundary from '@/components/error/user/dashboard/DashboardErrorBoundary'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store/user'

export default function UserDashboardScreen() {
  useColorModeRefresh()
  useAnalytics()
  const logout = useSessionError()
  const user = useRecoilValue(userState)

  const [queryReference, loadQuery] =
    useQueryLoader<UserDashboardQuery>(userDashboardQuery)

  const refetch = useCallback(() => {
    loadQuery({}, { fetchPolicy: 'network-only' })
  }, [loadQuery])

  useEffect(() => {
    if (user.skeetToken != '') {
      loadQuery({})
    }
  }, [loadQuery, user.skeetToken])

  if (queryReference == null) {
    return (
      <>
        <UserLayout>
          <DashboardLoading />
        </UserLayout>
      </>
    )
  }

  return (
    <>
      <UserLayout>
        <Suspense fallback={<DashboardLoading />}>
          <DashboardErrorBoundary
            showRetry={<ShowRetryDashboard refetch={refetch} />}
            logout={logout}
          >
            <UserDashboard queryReference={queryReference} refetch={refetch} />
          </DashboardErrorBoundary>
        </Suspense>
      </UserLayout>
    </>
  )
}
