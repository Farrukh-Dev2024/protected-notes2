import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Protected Notes',
    short_name: 'Protected Notes',
    description: 'A modern note taking app with end to end encryption,Could be used as single entry accounting system.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    "screenshots": [
      {
        "src": "AppImages/screenshots/Protected-Notes Image1.png",
        "type": "image/png",
        "sizes": "1920x1080",
        "form_factor": "wide",
        "label": "Wide layout screenshot"
      },
      {
        "src": "AppImages/screenshots/Protected-Notes Image1.png",
        "type": "image/png",
        "sizes": "1080x1920",
        "form_factor": "narrow",
        "label": "Mobile layout screenshot"
      }
    ],

    "icons": [
        {
        "src": "AppImages/windows11/SmallTile.scale-100.png",
        "sizes": "71x71"
        },
        {
        "src": "AppImages/windows11/SmallTile.scale-125.png",
        "sizes": "89x89"
        },
        {
        "src": "AppImages/windows11/SmallTile.scale-150.png",
        "sizes": "107x107"
        },
        {
        "src": "AppImages/windows11/SmallTile.scale-200.png",
        "sizes": "142x142"
        },
        {
        "src": "AppImages/windows11/SmallTile.scale-400.png",
        "sizes": "284x284"
        },
        {
        "src": "AppImages/windows11/Square150x150Logo.scale-100.png",
        "sizes": "150x150"
        },
        {
        "src": "AppImages/windows11/Square150x150Logo.scale-125.png",
        "sizes": "188x188"
        },
        {
        "src": "AppImages/windows11/Square150x150Logo.scale-150.png",
        "sizes": "225x225"
        },
        {
        "src": "AppImages/windows11/Square150x150Logo.scale-200.png",
        "sizes": "300x300"
        },
        {
        "src": "AppImages/windows11/Square150x150Logo.scale-400.png",
        "sizes": "600x600"
        },
        {
        "src": "AppImages/windows11/Wide310x150Logo.scale-100.png",
        "sizes": "310x150"
        },
        {
        "src": "AppImages/windows11/Wide310x150Logo.scale-125.png",
        "sizes": "388x188"
        },
        {
        "src": "AppImages/windows11/Wide310x150Logo.scale-150.png",
        "sizes": "465x225"
        },
        {
        "src": "AppImages/windows11/Wide310x150Logo.scale-200.png",
        "sizes": "620x300"
        },
        {
        "src": "AppImages/windows11/Wide310x150Logo.scale-400.png",
        "sizes": "1240x600"
        },
        {
        "src": "AppImages/windows11/LargeTile.scale-100.png",
        "sizes": "310x310"
        },
        {
        "src": "AppImages/windows11/LargeTile.scale-125.png",
        "sizes": "388x388"
        },
        {
        "src": "AppImages/windows11/LargeTile.scale-150.png",
        "sizes": "465x465"
        },
        {
        "src": "AppImages/windows11/LargeTile.scale-200.png",
        "sizes": "620x620"
        },
        {
        "src": "AppImages/windows11/LargeTile.scale-400.png",
        "sizes": "1240x1240"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.scale-100.png",
        "sizes": "44x44"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.scale-125.png",
        "sizes": "55x55"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.scale-150.png",
        "sizes": "66x66"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.scale-200.png",
        "sizes": "88x88"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.scale-400.png",
        "sizes": "176x176"
        },
        {
        "src": "AppImages/windows11/StoreLogo.scale-100.png",
        "sizes": "50x50"
        },
        {
        "src": "AppImages/windows11/StoreLogo.scale-125.png",
        "sizes": "63x63"
        },
        {
        "src": "AppImages/windows11/StoreLogo.scale-150.png",
        "sizes": "75x75"
        },
        {
        "src": "AppImages/windows11/StoreLogo.scale-200.png",
        "sizes": "100x100"
        },
        {
        "src": "AppImages/windows11/StoreLogo.scale-400.png",
        "sizes": "200x200"
        },
        {
        "src": "AppImages/windows11/SplashScreen.scale-100.png",
        "sizes": "620x300"
        },
        {
        "src": "AppImages/windows11/SplashScreen.scale-125.png",
        "sizes": "775x375"
        },
        {
        "src": "AppImages/windows11/SplashScreen.scale-150.png",
        "sizes": "930x450"
        },
        {
        "src": "AppImages/windows11/SplashScreen.scale-200.png",
        "sizes": "1240x600"
        },
        {
        "src": "AppImages/windows11/SplashScreen.scale-400.png",
        "sizes": "2480x1200"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-16.png",
        "sizes": "16x16"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-20.png",
        "sizes": "20x20"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-24.png",
        "sizes": "24x24"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-30.png",
        "sizes": "30x30"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-32.png",
        "sizes": "32x32"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-36.png",
        "sizes": "36x36"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-40.png",
        "sizes": "40x40"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-44.png",
        "sizes": "44x44"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-48.png",
        "sizes": "48x48"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-60.png",
        "sizes": "60x60"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-64.png",
        "sizes": "64x64"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-72.png",
        "sizes": "72x72"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-80.png",
        "sizes": "80x80"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-96.png",
        "sizes": "96x96"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.targetsize-256.png",
        "sizes": "256x256"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
        "sizes": "16x16"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
        "sizes": "20x20"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
        "sizes": "24x24"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
        "sizes": "30x30"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
        "sizes": "32x32"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
        "sizes": "36x36"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
        "sizes": "40x40"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
        "sizes": "44x44"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
        "sizes": "48x48"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
        "sizes": "60x60"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
        "sizes": "64x64"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
        "sizes": "72x72"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
        "sizes": "80x80"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
        "sizes": "96x96"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
        "sizes": "256x256"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
        "sizes": "16x16"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
        "sizes": "20x20"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
        "sizes": "24x24"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
        "sizes": "30x30"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
        "sizes": "32x32"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
        "sizes": "36x36"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
        "sizes": "40x40"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
        "sizes": "44x44"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
        "sizes": "48x48"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
        "sizes": "60x60"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
        "sizes": "64x64"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
        "sizes": "72x72"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
        "sizes": "80x80"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
        "sizes": "96x96"
        },
        {
        "src": "AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
        "sizes": "256x256"
        },
        {
        "src": "AppImages/android/android-launchericon-512-512.png",
        "sizes": "512x512"
        },
        {
        "src": "AppImages/android/android-launchericon-192-192.png",
        "sizes": "192x192"
        },
        {
        "src": "AppImages/android/android-launchericon-144-144.png",
        "sizes": "144x144"
        },
        {
        "src": "AppImages/android/android-launchericon-96-96.png",
        "sizes": "96x96"
        },
        {
        "src": "AppImages/android/android-launchericon-72-72.png",
        "sizes": "72x72"
        },
        {
        "src": "AppImages/android/android-launchericon-48-48.png",
        "sizes": "48x48"
        },
        {
        "src": "AppImages/ios/16.png",
        "sizes": "16x16"
        },
        {
        "src": "AppImages/ios/20.png",
        "sizes": "20x20"
        },
        {
        "src": "AppImages/ios/29.png",
        "sizes": "29x29"
        },
        {
        "src": "AppImages/ios/32.png",
        "sizes": "32x32"
        },
        {
        "src": "AppImages/ios/40.png",
        "sizes": "40x40"
        },
        {
        "src": "AppImages/ios/50.png",
        "sizes": "50x50"
        },
        {
        "src": "AppImages/ios/57.png",
        "sizes": "57x57"
        },
        {
        "src": "AppImages/ios/58.png",
        "sizes": "58x58"
        },
        {
        "src": "AppImages/ios/60.png",
        "sizes": "60x60"
        },
        {
        "src": "AppImages/ios/64.png",
        "sizes": "64x64"
        },
        {
        "src": "AppImages/ios/72.png",
        "sizes": "72x72"
        },
        {
        "src": "AppImages/ios/76.png",
        "sizes": "76x76"
        },
        {
        "src": "AppImages/ios/80.png",
        "sizes": "80x80"
        },
        {
        "src": "AppImages/ios/87.png",
        "sizes": "87x87"
        },
        {
        "src": "AppImages/ios/100.png",
        "sizes": "100x100"
        },
        {
        "src": "AppImages/ios/114.png",
        "sizes": "114x114"
        },
        {
        "src": "AppImages/ios/120.png",
        "sizes": "120x120"
        },
        {
        "src": "AppImages/ios/128.png",
        "sizes": "128x128"
        },
        {
        "src": "AppImages/ios/144.png",
        "sizes": "144x144"
        },
        {
        "src": "AppImages/ios/152.png",
        "sizes": "152x152"
        },
        {
        "src": "AppImages/ios/167.png",
        "sizes": "167x167"
        },
        {
        "src": "AppImages/ios/180.png",
        "sizes": "180x180"
        },
        {
        "src": "AppImages/ios/192.png",
        "sizes": "192x192"
        },
        {
        "src": "AppImages/ios/256.png",
        "sizes": "256x256"
        },
        {
        "src": "AppImages/ios/512.png",
        "sizes": "512x512"
        },
        {
        "src": "AppImages/ios/1024.png",
        "sizes": "1024x1024"
        }
    ]
  }
}