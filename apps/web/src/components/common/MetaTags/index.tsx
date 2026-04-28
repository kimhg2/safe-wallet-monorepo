import {
  BRAND_DESCRIPTION,
  BRAND_ICON,
  BRAND_NAME,
  BRAND_SOCIAL_IMAGE,
  BRAND_TWITTER_SITE,
  IS_BEHIND_IAP,
  IS_PRODUCTION,
} from '@/config/constants'
import { ContentSecurityPolicy, StrictTransportSecurity } from '@/config/securityHeaders'
import { lightPalette, darkPalette } from '@safe-global/theme/palettes'

const descriptionText = BRAND_DESCRIPTION
const titleText = BRAND_NAME

const MetaTags = ({ prefetchUrl }: { prefetchUrl: string }) => (
  <>
    <meta name="description" content={descriptionText} />
    {!IS_PRODUCTION && <meta name="robots" content="noindex" />}

    {/* Social sharing */}
    <meta name="og:image" content={BRAND_SOCIAL_IMAGE} />
    <meta name="og:description" content={descriptionText} />
    <meta name="og:title" content={titleText} />
    <meta name="twitter:card" content="summary_large_image" />
    {BRAND_TWITTER_SITE && <meta name="twitter:site" content={BRAND_TWITTER_SITE} />}
    <meta name="twitter:title" content={titleText} />
    <meta name="twitter:description" content={descriptionText} />
    <meta name="twitter:image" content={BRAND_SOCIAL_IMAGE} />

    {/* CSP */}
    <meta httpEquiv="Content-Security-Policy" content={ContentSecurityPolicy} />
    {IS_PRODUCTION && <meta httpEquiv="Strict-Transport-Security" content={StrictTransportSecurity} />}

    {/* Prefetch the backend domain */}
    <link rel="dns-prefetch" href={prefetchUrl} />
    <link rel="preconnect" href={prefetchUrl} crossOrigin="" />

    {/* Mobile tags */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

    {/* PWA primary color and manifest */}
    <meta name="theme-color" content={lightPalette.background.main} media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content={darkPalette.background.main} media="(prefers-color-scheme: dark)" />
    <link rel="manifest" href="/safe.webmanifest" {...(IS_BEHIND_IAP && { crossOrigin: 'use-credentials' })} />

    {/* Favicons */}
    <link rel="icon" type="image/svg+xml" href={BRAND_ICON} />
    <link rel="shortcut icon" href="/favicons/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000" />
  </>
)

export default MetaTags
