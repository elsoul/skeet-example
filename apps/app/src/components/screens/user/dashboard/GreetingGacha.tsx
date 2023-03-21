import Button from '@/components/common/atoms/Button'
import tw from '@/lib/tailwind'
import { useCallback } from 'react'
import { View, Text } from 'react-native'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { copyToClipboard } from '@/utils/userAction'

const greetings = {
  'en-US': [
    'Hello!',
    'Good morning!',
    'Hey there!',
    "What's up!",
    'Howdy!',
    'Hiya!',
    'Greetings!',
    'Nice to see you!',
    'Long time no see!',
    'Top of the morning to you!',
    'How are you doing?',
    "How's it going?",
    "What's new?",
    "What's happening?",
    "How's your day?",
    "How's your week been?",
    "How's life treating you?",
    'What have you been up to?',
    'How have you been?',
    'Nice to meet you!',
    'Howdy, partner!',
    'Good afternoon!',
    "How's everything?",
    "What's going on?",
    "What's the latest?",
    "How's your family?",
    "What's your plan for today?",
    "How's your weekend been?",
    "What's on your mind?",
    "How's your job going?",
  ],
  'ja-JP': [
    'こんにちは！',
    'おはようございます！',
    'やあ！',
    'どうも！',
    'こんにちは！',
    'こんちは！',
    'ごきげんよう！',
    'お元気ですか？',
    'お久しぶりです！',
    'おはよう！',
    'おはよー！',
    'おはよ！',
    '元気ですか？',
    '最近どうですか？',
    'お疲れ様です！',
    'いい天気ですね！',
    'お仕事お疲れ様です！',
    'お元気そうで何よりです！',
    'ご無沙汰しています！',
    '初めまして！',
    'おつかれさまです！',
    'こんばんは！',
    'おやすみなさい！',
    '元気にしていますか？',
    'お体に気をつけて！',
    'お祝い事、ありますか？',
    'お帰りなさい！',
    'ご飯はもう食べましたか？',
    '今日の予定は何ですか？',
    '今週はどうでしたか？',
  ],
}

type Props = {
  refetch: () => void
}

export default function GreetingGacha({ refetch }: Props) {
  const { t, i18n } = useTranslation()

  const getRandomGreeting = useCallback(() => {
    const languageArray = greetings[i18n.language as 'en-US' | 'ja-JP']
    const randomIndex = Math.floor(Math.random() * languageArray.length)
    return languageArray[randomIndex]
  }, [i18n.language])

  const onSubmit = useCallback(() => {
    copyToClipboard(getRandomGreeting())
  }, [getRandomGreeting])

  return (
    <>
      <View style={tw`w-full h-40 flex flex-row items-center justify-center`}>
        <Button
          onPress={() => {
            onSubmit()
          }}
          // disabled={isInFlight}
          className={clsx(
            // isInFlight ? 'bg-gray-300 dark:bg-gray-800 dark:text-gray-400' : '',
            'w-full py-2 px-3'
          )}
        >
          <Text
            style={tw`text-center font-loaded-bold text-lg text-white dark:text-gray-900`}
          >
            {t('users.greetingGacha')}
          </Text>
        </Button>
      </View>
    </>
  )
}
