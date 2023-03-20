import appSetting from '../../app.json'

const appConfig = {
  domain: 'example.skeet.dev',
  iosId: appSetting.expo.ios.bundleIdentifier,
  androidId: appSetting.expo.android.package,
  skeetApiDomain: 'api-example.skeet.dev',
  localIp: '192.168.2.35',
}

export default appConfig
