import { useCallback, useMemo, useState } from 'react'
import tw from '@/lib/tailwind'
import { userState } from '@/store/user'
import { useRecoilValue } from 'recoil'
import { View, Text, Image, Pressable } from 'react-native'
import { useFragment, graphql } from 'react-relay'
import { UserTransactionHistory_user$key } from '@/__generated__/UserTransactionHistory_user.graphql'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { openUrl } from '@/utils/link'

const fragment = graphql`
  fragment UserTransactionHistory_user on User {
    toTransfers {
      id
      amountLamport
      signature
      createdAt
      fromUser {
        id
        name
        iconUrl
      }
      toUser {
        id
        name
        iconUrl
      }
    }
    fromTransfers {
      id
      amountLamport
      signature
      createdAt
      fromUser {
        id
        name
        iconUrl
      }
      toUser {
        id
        name
        iconUrl
      }
    }
  }
`

type Props = {
  refetch: () => void
  userQuery: UserTransactionHistory_user$key
}

export default function UserTransactionHistory({ refetch, userQuery }: Props) {
  const user = useRecoilValue(userState)
  const [activeTab, setActiveTab] = useState<'to' | 'from'>('to')
  const { t } = useTranslation()

  const hasWallet = useMemo(
    () => user.wallet.pubkey != null && user.wallet.pubkey != '',
    [user.wallet]
  )

  const data = useFragment(fragment, userQuery)

  const timesList = useMemo(() => {
    let goodTimes = 0
    let greatTimes = 0
    let awesomeTimes = 0
    let greetingTimes = 0
    data.fromTransfers.forEach((item) => {
      if (item.amountLamport / LAMPORTS_PER_SOL == 0.2) {
        goodTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.3) {
        greatTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.5) {
        awesomeTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.8) {
        greetingTimes++
      }
    })
    data.toTransfers.forEach((item) => {
      if (item.amountLamport / LAMPORTS_PER_SOL == 0.2) {
        goodTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.3) {
        greatTimes++
      } else if (item.amountLamport / LAMPORTS_PER_SOL == 0.5) {
        awesomeTimes++
      }
    })
    return [
      {
        emoji: '👋',
        times: greetingTimes,
      },
      {
        emoji: '🤝',
        times: goodTimes,
      },
      {
        emoji: '🙌',
        times: greatTimes,
      },
      {
        emoji: '🚀',
        times: awesomeTimes,
      },
    ]
  }, [data])

  const showAction = useCallback((lamport: number) => {
    if (lamport / LAMPORTS_PER_SOL == 0.2) {
      return '🤝'
    } else if (lamport / LAMPORTS_PER_SOL == 0.3) {
      return '🙌'
    } else if (lamport / LAMPORTS_PER_SOL == 0.5) {
      return '🚀'
    } else if (lamport / LAMPORTS_PER_SOL == 0.8) {
      return '👋'
    }
  }, [])

  const onSubmit = useCallback(async (signature: string) => {
    await openUrl(`https://solscan.io/tx/${signature}?cluster=devnet`)
  }, [])

  if (!hasWallet) {
    return null
  }

  return (
    <>
      <View style={tw`max-w-xs py-12 flex flex-col`}>
        <View
          style={tw`w-full px-6 py-3 bg-gray-50 dark:bg-gray-700 flex flex-row items-center justify-center flex-wrap sm:flex-nowrap gap-12`}
        >
          {timesList.map((item) => (
            <View
              style={tw`flex flex-col items-center justify-center gap-2`}
              key={`PriceListItem${item.emoji}`}
            >
              <Text style={tw`text-2xl`}>{item.emoji}</Text>
              <Text
                style={tw`font-loaded-bold text-base tracking-tight text-gray-900 dark:text-white`}
              >
                {item.times.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={tw`w-full flex`}>
          <View style={tw`py-8`}>
            <View style={tw`flex flex-row items-center justify-center`}>
              <View style={tw`flex-1`}>
                <Pressable
                  onPress={() => {
                    setActiveTab('to')
                  }}
                >
                  <Text
                    style={tw`${clsx(
                      activeTab === 'to'
                        ? 'font-loaded-bold border-b-2'
                        : 'font-loaded-normal',
                      'py-3 dark:text-white dark:border-white text-center'
                    )}`}
                  >
                    {t('users.toMe')}
                  </Text>
                </Pressable>
              </View>
              <View style={tw`flex-1`}>
                <Pressable
                  onPress={() => {
                    setActiveTab('from')
                  }}
                >
                  <Text
                    style={tw`${clsx(
                      activeTab === 'from'
                        ? 'font-loaded-bold border-b-2'
                        : 'font-loaded-normal',
                      'py-3 dark:text-white dark:border-white text-center'
                    )}`}
                  >
                    {t('users.fromMe')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={tw`flex flex-col`}>
            {activeTab === 'to' && (
              <>
                {data.toTransfers
                  .map((i) => i)
                  .sort(
                    (a, b) =>
                      Number(new Date(b.createdAt)) -
                      Number(new Date(a.createdAt))
                  )
                  .slice(0, 5)
                  .map((item) => (
                    <View
                      key={`ToTransfers${item.id}`}
                      style={tw`flex flex-row items-center py-4 border-b border-gray-50 dark:border-gray-700 gap-4`}
                    >
                      <Image
                        source={{
                          uri:
                            item.fromUser?.iconUrl == ''
                              ? 'https://dummyimage.com/300x300/000/fff&text=USER'
                              : item.fromUser?.iconUrl ??
                                'https://dummyimage.com/300x300/000/fff&text=USER',
                        }}
                        alt={item.fromUser?.name ?? 'USER'}
                        style={tw`w-8 h-8 rounded-full`}
                      />
                      <View>
                        <Text style={tw`font-loaded-medium dark:text-white`}>
                          {item.fromUser.name}
                        </Text>
                        <Pressable
                          onPress={() => {
                            onSubmit(item.signature)
                          }}
                        >
                          <Text
                            style={tw`font-loaded-light text-xs text-gray-700 dark:text-gray-300`}
                          >
                            {`${item.signature.substring(
                              0,
                              4
                            )}...${item.signature.substring(
                              item.signature.length - 4,
                              item.signature.length
                            )}`}
                          </Text>
                        </Pressable>
                      </View>
                      <View style={tw`flex-grow`} />
                      <Text style={tw`text-lg`}>
                        {showAction(item.amountLamport)}
                      </Text>
                    </View>
                  ))}
              </>
            )}
            {activeTab === 'from' && (
              <>
                {data.fromTransfers
                  .map((i) => i)
                  .sort(
                    (a, b) =>
                      Number(new Date(b.createdAt)) -
                      Number(new Date(a.createdAt))
                  )
                  .slice(0, 5)
                  .map((item) => (
                    <View
                      key={`FromTransfers${item.id}`}
                      style={tw`flex flex-row items-center py-4 border-b border-gray-50 dark:border-gray-700 gap-4`}
                    >
                      <Image
                        source={{
                          uri:
                            item.toUser?.iconUrl == ''
                              ? 'https://dummyimage.com/300x300/000/fff&text=USER'
                              : item.toUser?.iconUrl ??
                                'https://dummyimage.com/300x300/000/fff&text=USER',
                        }}
                        alt={item.toUser?.name ?? 'USER'}
                        style={tw`w-8 h-8 rounded-full`}
                      />
                      <View>
                        <Text style={tw`font-loaded-medium dark:text-white`}>
                          {item.toUser.name}
                        </Text>
                        <Pressable
                          onPress={() => {
                            onSubmit(item.signature)
                          }}
                        >
                          <Text
                            style={tw`font-loaded-light text-xs text-gray-700 dark:text-gray-300`}
                          >
                            {`${item.signature.substring(
                              0,
                              4
                            )}...${item.signature.substring(
                              item.signature.length - 4,
                              item.signature.length
                            )}`}
                          </Text>
                        </Pressable>
                      </View>
                      <View style={tw`flex-grow`} />
                      <Text style={tw`text-lg`}>
                        {showAction(item.amountLamport)}
                      </Text>
                    </View>
                  ))}
              </>
            )}
          </View>
        </View>
      </View>
    </>
  )
}
