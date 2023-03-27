import tw from '@/lib/tailwind'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { View } from 'react-native'

type Props = {
  className?: string
  children: ReactNode
}

export default function Container({ className, children, ...props }: Props) {
  return (
    <>
      <View
        style={tw`${clsx(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full h-full',
          className
        )}`}
        {...props}
      >
        {children}
      </View>
    </>
  )
}
