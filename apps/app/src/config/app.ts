import appSetting from '../../app.json'

const appConfig = {
  domain: 'example.skeet.dev',
  iosId: appSetting.expo.ios.bundleIdentifier,
  androidId: appSetting.expo.android.package,
  skeetApiDomain: 'api-example.skeet.dev',
}

export default appConfig
