# ClubLife
App for students and student organinzation clubs to be connected

[Project Website](https://bcpoole.github.io/ClubLife/)

## Web
This is an ASP.NET Core web project pre-configured for building a .NET Core backend and an Aurelia front-end. It is configured for full ES Next support with Babel, similar to the standard skeleton-esnext option. This skeleton uses JSPM for package management and SystemJS for loading and bundling.

### API
Refer to the Swagger JSON and UI endpoints:

***\<your-root-url\>/swagger/v1/swagger.json***

***\<your-root-url\>/swagger/ui***

## Mobile
React-Native cross-platform app configured for Android and iOS.

## Util
Python scripts for scrapping and formatting data. Only to be run to get data to throw into database.

## APK
release apk is app-release-unsigned.apk, here in the main directory for Dr. Gray to see

keytool -genkey -v -keystore clublife.keystore -alias ClubLife -keyalg RSA -keysize 2048 -validity 10000

react-native bundle --platform android --dev false --entry-file index.android.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

cd android && ./gradlew assembleRelease

then cp the apk here

we also have the debug apk here as well in case everything is borked for some reason, generated with the advice from [this](http://stackoverflow.com/questions/35283959/build-and-install-unsigned-apk-on-device-without-the-development-server) and [this](http://stackoverflow.com/questions/30366905/difference-between-app-debug-apk-and-app-debug-unaligned-apk) stackoverflow threads

if you do the debug apk you will want app-debug.apk (not the unaligned one)

clublife.keystore is not here but on Jonathan's local, if we need it for some reason please contact Jonathan
