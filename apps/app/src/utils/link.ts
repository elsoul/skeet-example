import * as Linking from 'expo-linking'
import i18n from '@/lib/i18n'
import Toast from 'react-native-toast-message'
import * as WebBrowser from 'expo-web-browser'

export async function openUrl(url: string) {
  const supported = await Linking.canOpenURL(url)
  if (supported) {
    await WebBrowser.openBrowserAsync(url)
  } else {
    Toast.show({
      type: 'error',
      text1: i18n.t('linkError') ?? 'Link Error',
      text2: i18n.t('urlError') ?? 'Could not open the link',
    })
  }
}
