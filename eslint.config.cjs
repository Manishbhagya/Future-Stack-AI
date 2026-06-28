const nextConfig = require("eslint-config-next");

module.exports = [
  {
    ignores: [
      "**/components/AccessibilityPro.*",
      "**/components/XOrbit.*",
      "**/components/CookieConsentBanner.*",
      "**/components/MultiStepWaitlistForm.*",
      "**/components/ScrollIndicator.*",
      "**/components/SocialProofCard.*",
    ],
  },
  ...nextConfig,
];
