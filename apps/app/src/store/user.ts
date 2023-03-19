import { atom } from 'recoil'
import ReactNativeRecoilPersist from 'react-native-recoil-persist'

export type UserState = {
  uid: string
  email: string
  name: string
  iconUrl: string
  role: string
  wallet: {
    pubkey: string
    sol: number
  }
  skeetToken: string
}

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    uid: '',
    email: '',
    name: '',
    iconUrl: '',
    role: 'USER',
    wallet: {
      pubkey: '',
      sol: 0,
    },
    skeetToken: '',
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
})
