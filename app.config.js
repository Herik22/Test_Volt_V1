export default {
  "expo": {
    "name": "testVolt_v1",
    "slug": "testVolt_v1",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins":[
      "@react-native-google-signin/google-signin"
    ],
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.firebase.appTestVolt",
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.firebase.appTestVolt",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "ddbf5dc6-2044-4ca4-a50b-cb771263265b"
      }
    },
    "owner": "hdirtvep"
  }
}
