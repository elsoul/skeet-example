const path = require('path')
const { getDefaultConfig } = require('@expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.resolver.assetExts.push('cjs')
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== 'svg'
)
defaultConfig.resolver.sourceExts.push('svg')
defaultConfig.resolver.sourceExts.push('jsx')
defaultConfig.resolver.sourceExts.push('js')
defaultConfig.resolver.sourceExts.push('ts')
defaultConfig.resolver.sourceExts.push('tsx')
defaultConfig.resolver.sourceExts.push('cjs')
defaultConfig.resolver.extraNodeModules = require('expo-crypto-polyfills')
defaultConfig.resolver.extraNodeModules.stream =
  require.resolve('readable-stream')
defaultConfig.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
)

defaultConfig.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
  '@assets': path.resolve(__dirname, 'assets'),
}

module.exports = defaultConfig
