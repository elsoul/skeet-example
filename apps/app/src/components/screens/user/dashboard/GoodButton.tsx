import { useMemo } from 'react'
import tw, { colors } from '@/lib/tailwind'
import { useCallback } from 'react'
import { Text, Pressable, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { userState } from '@/store/user'
import { useRecoilValue } from 'recoil'
import { useMutation, graphql } from 'react-relay'
import { GoodButtonMutation } from '@/__generated__/GoodButtonMutation.graphql'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import Toast from 'react-native-toast-message'

const mutation = graphql`
  mutation GoodButtonMutation($toUserId: String, $postId: String) {
    sendGood(toUserId: $toUserId, postId: $postId)
  }
`

type Props = {
  postId: string
  toUserId: string
  name: string
  refetch: () => void
}

export default function GoodButton({ postId, toUserId, name, refetch }: Props) {
  const { t } = useTranslation()
  const user = useRecoilValue(userState)

  const hasSOL = useMemo(
    () =>
      user.wallet.pubkey != null &&
      user.wallet.pubkey != '' &&
      user.wallet.sol > 0.201 * LAMPORTS_PER_SOL,
    [user.wallet]
  )
  const [commit, isInFlight] = useMutation<GoodButtonMutation>(mutation)

  const onSubmit = useCallback(() => {
    if (hasSOL) {
      commit({
        variables: { postId, toUserId },
        onCompleted: () => {
          Toast.show({
            type: 'success',
            text1: '🤝',
            text2: `to: ${name}`,
          })
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
    } else {
      Toast.show({
        type: 'warning',
        text1: t('users.notEnoughSOL') ?? 'Not enough SOL',
        text2: t('users.getAirdrop') ?? 'Please get Airdrop',
      })
    }
  }, [hasSOL, commit, t, refetch, toUserId, name, postId])

  return (
    <>
      <Pressable
        disabled={isInFlight}
        onPress={() => {
          onSubmit()
        }}
      >
        {isInFlight ? (
          <ActivityIndicator color={colors.blue[400]} />
        ) : (
          <Text style={tw`text-xl`}>🤝</Text>
        )}
      </Pressable>
    </>
  )
}
