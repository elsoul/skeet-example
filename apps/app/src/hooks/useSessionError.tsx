import { useRecoilCallback } from 'recoil'
import Toast from 'react-native-toast-message'
import { userState } from '@/store/user'
import { useTranslation } from 'react-i18next'

export default function useSessionError() {
  const { t } = useTranslation()

  const logout = useRecoilCallback(({ reset }) => () => {
    reset(userState)
    Toast.show({
      type: 'warning',
      text1: t('sessionErrorLogout') ?? 'Session expired',
      text2: t('pleaseLoginAgain') ?? 'Please sign in again.',
    })
  })
  return logout
}
