import * as Clipboard from 'expo-clipboard'
import i18n from '@/lib/i18n'
import Toast from 'react-native-toast-message'

export const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text)
  Toast.show({
    type: 'success',
    text1: i18n.t('copyToClipboardSuccess') ?? 'Copied📜',
    text2: text,
  })
}

export const fetchCopiedText = async () => {
  const text = await Clipboard.getStringAsync()
  return text
}
