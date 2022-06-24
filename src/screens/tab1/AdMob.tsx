import {useEffect, useState} from 'react';
import mobileAds, {
  MaxAdContentRating,
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

// 광고 단위 ID
const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-7203856140151966/4393353573';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  // keywords: ['fashion', 'clothing'],
});

// Interstitial - 전면광고 테스트 ID
InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

// function APP () => {} return 문 내의 코드

// 맞춤 광고
mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR'],
  })
  .then(() => {
    // Request config successfully set!
  });

// 광고 ㄱ ㄱ
const [loaded, setLoaded] = useState(false);

useEffect(() => {
  const unsubscribe = interstitial.addAdEventListener(
    AdEventType.LOADED,
    res => {
      console.log('AdEventType.LOADED == ', res);
    },
  );

  // Start loading the interstitial straight away
  interstitial.load();

  // Unsubscribe from events on unmount
  return unsubscribe;
}, []);

interstitial.addAdEventListener(AdEventType.LOADED, () =>
  console.log('LOADED')
);
interstitial.addAdEventListener(AdEventType.OPENED, () => {
  console.log('OPENED');
});
interstitial.addAdEventListener(AdEventType.CLICKED, () => {
  console.log('CLICKED');
});
interstitial.addAdEventListener(AdEventType.CLOSED, () => {
  console.log('CLOSED');
});
interstitial.addAdEventListener(AdEventType.ERROR, () => {
  console.log('ERROR');
});


return (
  <TouchableOpacity
    style={{width: 400, height: 400, backgroundColor: '#fee'}}
    onPress={() => {
      interstitial.show();
    }}
)