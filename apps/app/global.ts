import { Platform } from 'react-native'

export interface Global {
  btoa: any
  atob: any
  self: any
  Buffer: any
  process: any
  location: any
}

declare let global: Global
if (typeof global.self === 'undefined') {
  global.self = global
}

global.btoa = global.btoa || require('base-64').encode
global.atob = global.atob || require('base-64').decode

global.Buffer = require('buffer').Buffer
global.Buffer.TYPED_ARRAY_SUPPORT = false

global.process = require('process')
global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production'

if (Platform.OS !== 'web') {
  global.location = {
    protocol: 'https',
  }
}
