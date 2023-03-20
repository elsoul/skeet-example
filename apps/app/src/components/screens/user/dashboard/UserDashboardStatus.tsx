import { useEffect, useMemo, useCallback } from 'react'
import { UserDashboardStatus_query$key } from '@/__generated__/UserDashboardStatus_query.graphql'
import { useFragment, graphql, useMutation } from 'react-relay'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import { View, Text, Image, Pressable } from 'react-native'
import tw from '@/lib/tailwind'
import CreateUserWallet from './CreateUserWallet'
import Button from '@/components/common/atoms/Button'
import LogoHorizontal from '@/components/common/atoms/LogoHorizontal'
import clsx from 'clsx'
import {
  UserDashboardStatusMutation,
  UserDashboardStatusMutation$data,
} from '@/__generated__/UserDashboardStatusMutation.graphql'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'
// import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { ArrowPathIcon } from 'react-native-heroicons/outline'
import { Platform } from 'react-native'

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

const mutation = graphql`
  mutation UserDashboardStatusMutation {
    airdrop {
      pubkey
      sol
    }
  }
`

type Props = {
  refetch: () => void
  query: UserDashboardStatus_query$key
}

export default function UserDashboardStatus({ refetch, query }: Props) {
  const [user, setUser] = useRecoilState(userState)
  const { t } = useTranslation()

  const data = useFragment(fragment, query)

  useEffect(() => {
    if (
      data.userWalletsConnection?.edges &&
      data.userWalletsConnection?.edges?.length > 0 &&
      (data.userWalletsConnection.edges[0]?.node?.pubkey !==
        user.wallet.pubkey ||
        data.userWalletsConnection.edges[0]?.node?.sol !== user.wallet.sol)
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

  const [commit, isInFlight] =
    useMutation<UserDashboardStatusMutation>(mutation)

  const onSubmit = useCallback(() => {
    commit({
      variables: {},
      onCompleted: ({ airdrop }: UserDashboardStatusMutation$data) => {
        if (airdrop?.sol === user.wallet.sol) {
          Toast.show({
            type: 'error',
            text1: t('networkErrorTitle') ?? 'Network Error',
            text2:
              t('networkErrorBody') ??
              'Network connection failed. Please retry it again later.',
          })
        } else {
          Toast.show({
            type: 'success',
            text1: t('users.airdropSuccessTitle') ?? 'Succeed to create',
            text2:
              t('users.airdropSuccessBody') ??
              "Created the wallet🙌 Let's get Airdrop!",
          })
        }
        refetch()
      },
      onError: (err) => {
        console.error(err)
        Toast.show({
          type: 'error',
          text1: t('networkErrorTitle') ?? 'Network Error',
          text2:
            t('networkErrorBody') ??
            'Network connection failed. Please retry it again later.',
        })
      },
    })
  }, [commit, t, refetch, user.wallet.sol])

  if (!hasWallet) {
    return (
      <>
        <CreateUserWallet refetch={refetch} />
      </>
    )
  }

  return (
    <>
      <View style={tw`max-w-sm`}>
        <View style={tw`sm:mx-auto sm:w-full sm:max-w-md`}>
          <LogoHorizontal />
          <View
            style={tw`pt-6 flex flex-row items-center justify-center gap-6`}
          >
            <View style={tw``}>
              <Image
                source={{
                  uri:
                    user.iconUrl == ''
                      ? 'https://dummyimage.com/300x300/000/fff&text=USER'
                      : user.iconUrl,
                }}
                alt={user.name}
                style={tw`w-12 h-12 rounded-full`}
              />
            </View>
            <View style={tw``}>
              <Text
                style={tw`font-loaded-bold text-base tracking-tight text-gray-900 dark:text-white`}
              >
                {user.name}
              </Text>
              <Text
                style={tw`font-loaded-normal text-xs tracking-tight text-gray-700 dark:text-gray-200`}
              >
                {user.email}
              </Text>
            </View>
            <View style={tw``}>
              <Pressable
                onPress={() => {
                  refetch()
                }}
              >
                <ArrowPathIcon
                  style={tw`w-6 h-6 mx-auto text-gray-900 dark:text-gray-50`}
                />
              </Pressable>
            </View>
          </View>
          <View
            style={tw`${clsx(Platform.OS === 'android' ? 'pt-6' : '', '')}`}
          >
            <Text
              style={tw`font-loaded-bold pt-6 text-center text-5xl tracking-tight text-gray-900 dark:text-white`}
            >
              {(user.wallet.sol / 10 ** 9).toLocaleString()}
              <Text
                style={tw`font-loaded-bold ml-1 mt-2 text-center text-2xl tracking-tight text-gray-700 dark:text-gray-200`}
              >
                SOL
              </Text>
            </Text>
          </View>
          <View style={tw`mt-8 flex items-center justify-center gap-x-6`}>
            <Button
              onPress={() => {
                onSubmit()
              }}
              disabled={isInFlight}
              className={clsx(
                isInFlight
                  ? 'bg-gray-300 dark:bg-gray-800 dark:text-gray-400'
                  : '',
                'w-full py-2 px-3'
              )}
            >
              <Text
                style={tw`text-center font-loaded-bold text-lg text-white dark:text-gray-900`}
              >
                {t('users.airdrop')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}
