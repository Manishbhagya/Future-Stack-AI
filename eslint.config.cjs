const nextConfig = require("eslint-config-next");

module.exports = [
  {
    ignores: [
      "**/components/AccessibilityPro.js",
      "**/components/XOrbit.js",
      "**/components/CookieConsentBanner.js",
      "**/components/MultiStepWaitlistForm.js",
      "**/components/ScrollIndicator.js",
      "**/components/SocialProofCard.js",
    ],
  },
  ...nextConfig,
];
