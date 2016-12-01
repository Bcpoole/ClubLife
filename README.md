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
we didn't sign it since we don't plan on releasing it, but we have the debug apk here generated with the advice from [this](http://stackoverflow.com/questions/35283959/build-and-install-unsigned-apk-on-device-without-the-development-server) and [this](http://stackoverflow.com/questions/30366905/difference-between-app-debug-apk-and-app-debug-unaligned-apk) stackoverflow threads

--dev=false should make it not spit warnings and errors, if they show up (they shouldn't, we're amazing 1337 haxx0r cod3r ninjarockstars) just dismiss them :O

clublife.keystore is not here but on Jonathan's local, if we need it for some reason please contact Jonathan
