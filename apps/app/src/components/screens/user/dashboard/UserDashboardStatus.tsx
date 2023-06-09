import { useMemo, useCallback } from 'react'
import { graphql, useMutation } from 'react-relay'
import { useRecoilValue } from 'recoil'
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
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { ArrowPathIcon, ClipboardIcon } from 'react-native-heroicons/outline'
import { Platform } from 'react-native'
import { copyToClipboard } from '@/utils/userAction'
import SolanaLogoMark from '@assets/logo/projects/solanaLogoMark.svg'

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
}

export default function UserDashboardStatus({ refetch }: Props) {
  const user = useRecoilValue(userState)
  const { t } = useTranslation()

  const hasWallet = useMemo(
    () => user.wallet.pubkey != null && user.wallet.pubkey != '',
    [user.wallet]
  )

  const walletCompact = useMemo(() => {
    const walletName = user.wallet.pubkey
    if (walletName.length <= 8) {
      return walletName
    } else {
      const firstFour = walletName.substring(0, 4)
      const lastFour = walletName.substring(walletName.length - 4)
      return firstFour + '...' + lastFour
    }
  }, [user.wallet.pubkey])

  const [commit, isInFlight] =
    useMutation<UserDashboardStatusMutation>(mutation)

  const onSubmit = useCallback(() => {
    commit({
      variables: {},
      onCompleted: ({ airdrop }: UserDashboardStatusMutation$data) => {
        if (airdrop?.sol === user.wallet.sol) {
          Toast.show({
            type: 'warning',
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
          type: 'warning',
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
      <View style={tw`max-w-xs`}>
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
          <View style={tw`mt-2 flex items-center justify-center gap-x-6`}>
            <View style={tw`px-3 py-1 bg-gray-50 dark:bg-gray-700`}>
              <Text
                style={tw`text-center font-loaded-normal text-sm dark:text-white text-gray-900`}
              >
                Devnet
              </Text>
            </View>
          </View>
          <View
            style={tw`mt-2 flex flex-row items-center justify-center gap-x-3`}
          >
            <View style={tw``}>
              <Text
                style={tw`text-center font-loaded-normal text-xs dark:text-white text-gray-900`}
              >
                {walletCompact}
              </Text>
            </View>
            <View style={tw``}>
              <Pressable
                onPress={() => {
                  copyToClipboard(user.wallet.pubkey)
                }}
              >
                <ClipboardIcon
                  style={tw`w-4 h-4 mx-auto text-gray-900 dark:text-gray-50`}
                />
              </Pressable>
            </View>
          </View>
          <View
            style={tw`${clsx(
              Platform.OS === 'android' ? 'pt-6' : '',
              'flex flex-row items-center justify-center gap-x-4'
            )}`}
          >
            <SolanaLogoMark
              style={tw`h-10 w-10 pt-6`}
              viewBox="0 0 101 88"
              width={''}
            />
            <Text
              style={tw`font-loaded-bold pt-6 text-center text-5xl tracking-tight text-gray-900 dark:text-white`}
            >
              {(user.wallet.sol / LAMPORTS_PER_SOL).toLocaleString()}
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
              <Text style={tw`text-center font-loaded-bold text-lg text-white`}>
                {t('users.airdrop')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}
