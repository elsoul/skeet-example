import tw from '@/lib/tailwind'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { InboxIcon } from 'react-native-heroicons/outline'

export default function EmptyRecords() {
  const { t } = useTranslation()
  return (
    <>
      <View style={tw`flex flex-col items-center justify-center gap-3 py-8`}>
        <InboxIcon style={tw`w-16 h-16 text-gray-400 flex`} />
        <View style={tw`flex flex-col justify-center items-center`}>
          <Text style={tw`font-loaded-bold text-lg flex text-center`}>
            {t('noRecords')}
          </Text>
          <Text style={tw`font-loaded-normal flex text-center`}>
            {t('makeActions')}
          </Text>
        </View>
      </View>
    </>
  )
}
