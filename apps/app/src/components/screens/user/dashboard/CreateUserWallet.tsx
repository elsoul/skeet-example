import { View, Text, Image } from 'react-native'
import tw from '@/lib/tailwind'
import LogoHorizontal from '@/components/common/atoms/LogoHorizontal'
import { useTranslation } from 'react-i18next'
import Button from '@/components/common/atoms/Button'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store/user'

export default function CreateUserWallet() {
  const user = useRecoilValue(userState)
  const { t } = useTranslation()

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
                source={{ uri: user.iconUrl }}
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
                // refetch()
              }}
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
