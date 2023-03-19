import tw from '@/lib/tailwind'
import { View } from 'react-native'
import Container from '@/components/common/atoms/Container'

export default function DashboardLoading() {
  return (
    <>
      <Container>
        <View
          style={tw`flex flex-col md:flex-row items-center justify-center gap-24`}
        >
          <View style={tw``}>
            <View style={tw`w-full h-full`}>
              <View
                style={tw`flex w-full flex-row gap-6 justify-center items-center`}
              >
                <View
                  style={tw`w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800`}
                />
                <View style={tw`w-48 h-8 bg-gray-50 dark:bg-gray-800`} />
              </View>

              <View style={tw`mt-6 w-80 h-6 bg-gray-50 dark:bg-gray-800`} />
              <View style={tw`mt-2 w-80 h-6 bg-gray-50 dark:bg-gray-800`} />
              <View style={tw`mt-2 w-80 h-6 bg-gray-50 dark:bg-gray-800`} />
            </View>
          </View>
          <View style={tw`grow`}>
            <View style={tw`w-full h-full`}>
              <View
                style={tw`mt-8 w-64 h-8 mx-auto bg-gray-50 dark:bg-gray-800`}
              />
              <View
                style={tw`mt-6 w-80 mx-auto h-6 bg-gray-50 dark:bg-gray-800`}
              />
              <View
                style={tw`mt-2 w-80 mx-auto h-6 bg-gray-50 dark:bg-gray-800`}
              />
              <View
                style={tw`mt-2 w-80 mx-auto h-6 bg-gray-50 dark:bg-gray-800`}
              />
            </View>
          </View>
        </View>
      </Container>
    </>
  )
}
