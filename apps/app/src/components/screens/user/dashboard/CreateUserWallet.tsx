import { View, Text, Image } from 'react-native'
import tw from '@/lib/tailwind'
import LogoHorizontal from '@/components/common/atoms/LogoHorizontal'
import { useTranslation } from 'react-i18next'
import Button from '@/components/common/atoms/Button'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store/user'
import { graphql, useMutation } from 'react-relay'
import {
  CreateUserWalletMutation,
  CreateUserWalletMutation$data,
} from '@/__generated__/CreateUserWalletMutation.graphql'
import clsx from 'clsx'
import { useCallback } from 'react'
import Toast from 'react-native-toast-message'

const mutation = graphql`
  mutation CreateUserWalletMutation {
    createWallet(name: "SkeetExampleDev") {
      pubkey
      sol
    }
  }
`

type Props = {
  refetch: () => void
}

export default function CreateUserWallet({ refetch }: Props) {
  const user = useRecoilValue(userState)
  const { t } = useTranslation()

  const [commit, isInFlight] = useMutation<CreateUserWalletMutation>(mutation)

  const onSubmit = useCallback(() => {
    commit({
      variables: {},
      onCompleted: ({ createWallet }: CreateUserWalletMutation$data) => {
        Toast.show({
          type: 'success',
          text1: t('users.createWalletSuccessTitle') ?? 'Succeed to create',
          text2:
            t('users.createWalletSuccessBody') ??
            "Created the wallet🙌 Let's get Airdrop!",
        })
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
  }, [commit, t, refetch])

  return (
    <>
      <View style={tw`max-w-sm`}>
        <View style={tw`sm:mx-auto sm:w-full sm:max-w-md`}>
          <LogoHorizontal />
          <View
            style={tw`mt-6 flex flex-row items-center justify-center gap-4`}
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
          </View>
          <Text
            style={tw`font-loaded-bold mt-6 text-center text-2xl tracking-tight text-gray-900 dark:text-white`}
          >
            {t('users.welcome')}
          </Text>
          <Text
            style={tw`font-loaded-normal mt-2 text-center text-base tracking-tight text-gray-700 dark:text-gray-200`}
          >
            {t('users.letsCreateWallet')}
          </Text>
          <View style={tw`mt-4 flex items-center justify-center gap-x-6`}>
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
                {t('users.createWallet')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}
