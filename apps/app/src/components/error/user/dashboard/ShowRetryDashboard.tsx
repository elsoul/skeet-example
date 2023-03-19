import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import tw from '@/lib/tailwind'
import { ExclamationCircleIcon } from 'react-native-heroicons/outline'
import Button from '@/components/common/atoms/Button'

type Props = {
  refetch: () => void
}

export default function ShowRetryDashboard({ refetch }: Props) {
  const { t } = useTranslation()

  return (
    <>
      <View
        style={tw`flex h-full flex-col items-center justify-start py-18 sm:px-6 lg:px-8`}
      >
        <View style={tw`sm:mx-auto sm:w-full sm:max-w-md`}>
          <ExclamationCircleIcon
            style={tw`w-24 h-24 mx-auto text-gray-900 dark:text-gray-50`}
          />
          <Text
            style={tw`font-loaded-bold mt-6 text-center text-3xl tracking-tight text-gray-900 dark:text-white`}
          >
            {t('networkErrorTitle')}
          </Text>
          <Text
            style={tw`px-2 mt-2 text-center text-sm text-gray-600 dark:text-gray-300`}
          >
            {t('networkErrorBody')}
          </Text>
          <View style={tw`mt-4 flex items-center justify-center gap-x-6`}>
            <Button
              onPress={() => {
                refetch()
              }}
            >
              <Text
                style={tw`text-center font-loaded-bold text-lg text-white dark:text-gray-900`}
              >
                {t('refetch')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}
