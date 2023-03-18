import { Pressable, Text, View } from 'react-native'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import tw from '@/lib/tailwind'
import { useTranslation } from 'react-i18next'
import useColorModeRefresh from '@/hooks/useColorModeRefresh'
import LogoHorizontal from '@/components/common/atoms/LogoHorizontal'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import Toast from 'react-native-toast-message'
import useAnalytics from '@/hooks/useAnalytics'
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
import { emailSchema, passwordSchema } from '@/utils/form'
import { firebaseAuth } from '@/lib/firebase'
import Button from '@/components/common/atoms/Button'
import { sleep } from '@/utils/time'
import { graphql, useMutation } from 'react-relay'
import {
  LoginScreenMutation,
  LoginScreenMutation$data,
} from '@/__generated__/LoginScreenMutation.graphql'

const mutation = graphql`
  mutation LoginScreenMutation($token: String!) {
    login(token: $token) {
      token
    }
  }
`

export default function LoginScreen() {
  useColorModeRefresh()
  useAnalytics()
  const { t } = useTranslation()
  const navigation = useNavigation<any>()
  const [user, setUser] = useRecoilState(userState)
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const validateEmail = useCallback(() => {
    try {
      emailSchema.parse(email)
      setEmailError('')
    } catch (err) {
      setEmailError('emailErrorText')
    }
  }, [email, setEmailError])

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const validatePassword = useCallback(() => {
    try {
      passwordSchema.parse(password)
      setPasswordError('')
    } catch (err) {
      setPasswordError('passwordErrorText')
    }
  }, [password, setPasswordError])

  const validate = useCallback(() => {
    validateEmail()
    validatePassword()
  }, [validateEmail, validatePassword])

  const [commit] = useMutation<LoginScreenMutation>(mutation)

  const login = useCallback(async () => {
    if (firebaseAuth && emailError === '' && passwordError === '') {
      try {
        setLoading(true)
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        )
        if (!userCredential.user.emailVerified) {
          await sendEmailVerification(userCredential.user)
          throw new Error('Not verified')
        }

        const fbToken = await userCredential.user.getIdToken()
        console.log(fbToken)

        commit({
          variables: {
            token:
              'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOTczZWUwZTE2ZjdlZWY0ZjkyMWQ1MGRjNjFkNzBiMmVmZWZjMTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2tlZXQtZXhhbXBsZSIsImF1ZCI6InNrZWV0LWV4YW1wbGUiLCJhdXRoX3RpbWUiOjE2NzkxNzI2NTUsInVzZXJfaWQiOiJSYUxERDREak9MTXFKRGdOSUNOTEFHOGYzUnUyIiwic3ViIjoiUmFMREQ0RGpPTE1xSkRnTklDTkxBRzhmM1J1MiIsImlhdCI6MTY3OTE3MjY1NSwiZXhwIjoxNjc5MTc2MjU1LCJlbWFpbCI6InMua2lzaGlAZWxzb3VsLm5sIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicy5raXNoaUBlbHNvdWwubmwiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kxAl4AhAjxeMQV966sc7CTnPu2H1BUCGoxDo6v3yCdSwrrUDg034-UGqfL-RZXQtfXtxr23E_luwzqb6nhENrXj2xvL1Lhc7Cez2HRQtgoeuFR-lBcAsxkYJ9w2vC8KA_MKonpT8QZWu_lDyd1fAoyqaN1e6cBkS4un_jwGZfp5nv14WVuQX9mC0Wi-OBZpgcXB_xnKVQ_Sjz2oBk-UiU7OJHtSNj5iBoPfG4hu60JO58O5Epo01isbn0G7drItv1JwRZBM6M0nIAcH22e32pzejWcsx4dTq9Q41TsIyMIyvN-LkRVk68KFCGwyPkiD1ikG9OwkGxt7AbGBKepIQ3g',
          },
          onCompleted: ({ login }: LoginScreenMutation$data) => {
            Toast.show({
              type: 'success',
              text1: t('succeedLogin') ?? 'Succeed to sign in🎉',
              text2: t('howdy') ?? 'Howdy?',
            })
            setUser({
              ...user,
              uid: userCredential.user.uid,
              skeetToken: login?.token ?? '',
            })
          },
          onError: (err) => {
            console.error(err)
            Toast.show({
              type: 'error',
              text1: t('errorLoginTitle') ?? 'Failed to sign in.',
              text2:
                t('errorLoginBody') ??
                'Something went wrong... Please try it again.',
            })
            setUser({
              ...user,
              skeetToken: '',
            })
          },
        })
      } catch (err) {
        console.error(err)
        if (err instanceof Error && err.message === 'Not verified') {
          Toast.show({
            type: 'error',
            text1: t('errorNotVerifiedTitle') ?? 'Not verified.',
            text2:
              t('errorNotVerifiedBody') ??
              'Sent email to verify. Please check your email box.',
          })
        } else {
          Toast.show({
            type: 'error',
            text1: t('errorLoginTitle') ?? 'Failed to sign in.',
            text2:
              t('errorLoginBody') ??
              'Something went wrong... Please try it again.',
          })
        }
      } finally {
        setLoading(false)
      }
    }
  }, [user, setUser, t, email, password, emailError, passwordError, commit])

  return (
    <>
      <DefaultLayout>
        <View
          style={tw`flex h-full flex-col items-center justify-start py-12 sm:px-6 lg:px-8`}
        >
          <View style={tw`sm:mx-auto sm:w-full sm:max-w-md`}>
            <LogoHorizontal />
            <Text
              style={tw`font-loaded-bold mt-6 text-center text-3xl tracking-tight text-gray-900 dark:text-white`}
            >
              {t('loginToYourAccount')}
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Register')
              }}
            >
              <Text
                style={tw`mt-2 text-center text-sm text-gray-600 dark:text-gray-300`}
              >
                {t('or')}{' '}
                <Text
                  style={tw`font-loaded-medium text-indigo-500 dark:text-indigo-200`}
                >
                  {t('registerYourAccount')}
                </Text>
              </Text>
            </Pressable>
          </View>
          <View style={tw`w-full sm:mx-auto sm:max-w-md`}>
            <View style={tw`px-4 py-6 sm:px-10 gap-6`}>
              <View>
                <Text
                  style={tw`text-sm font-loaded-medium leading-6 text-gray-900 dark:text-gray-50`}
                >
                  {t('email')}
                  {emailError !== '' && (
                    <Text style={tw`text-red-500 dark:text-red-300 text-xs`}>
                      {' : '}
                      {t(emailError)}
                    </Text>
                  )}
                </Text>
                <View style={tw`mt-2`}>
                  <TextInput
                    style={tw`w-full border-2 border-gray-900 dark:border-gray-50 p-3 text-lg font-loaded-bold text-gray-900 dark:text-white sm:leading-6`}
                    inputMode="email"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={tw`text-sm font-loaded-medium leading-6 text-gray-900 dark:text-gray-50`}
                >
                  {t('password')}
                  {passwordError !== '' && (
                    <Text style={tw`text-red-500 dark:text-red-300 text-xs`}>
                      {' : '}
                      {t(passwordError)}
                    </Text>
                  )}
                </Text>
                <View style={tw`mt-2`}>
                  <TextInput
                    style={tw`w-full border-2 border-gray-900 dark:border-gray-50 p-3 text-lg font-loaded-bold text-gray-900 dark:text-white sm:leading-6`}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              <View style={tw`flex-row items-center`}>
                <View style={tw`flex`}></View>
                <View style={tw`flex flex-1`}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('ResetPassword')
                    }}
                  >
                    <Text
                      style={tw`px-2 text-right font-loaded-medium text-indigo-500 dark:text-indigo-200`}
                    >
                      {t('forgotYourPassword')}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View>
                <Button
                  onPress={async () => {
                    validate()
                    await sleep(100)
                    login()
                  }}
                  disabled={isLoading}
                  className="w-full py-2 px-3"
                >
                  <Text
                    style={tw`text-center font-loaded-bold text-lg text-white`}
                  >
                    {t('login')}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </DefaultLayout>
    </>
  )
}
