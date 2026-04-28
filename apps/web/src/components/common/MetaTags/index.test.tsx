import MetaTags from '.'
import { BRAND_DESCRIPTION, BRAND_ICON, BRAND_NAME, BRAND_SOCIAL_IMAGE, BRAND_TWITTER_SITE } from '@/config/constants'
import { render } from '@/tests/test-utils'

describe('MetaTags', () => {
  it('renders brand metadata and favicon links', () => {
    render(<MetaTags prefetchUrl="https://client.example" />)

    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', BRAND_DESCRIPTION)
    expect(document.querySelector('meta[name="og:title"]')).toHaveAttribute('content', BRAND_NAME)
    expect(document.querySelector('meta[name="twitter:image"]')).toHaveAttribute('content', BRAND_SOCIAL_IMAGE)
    expect(document.querySelector('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href', BRAND_ICON)
    expect(document.querySelector('link[rel="dns-prefetch"]')).toHaveAttribute('href', 'https://client.example')
  })

  it('omits the Twitter site tag when it is not configured', () => {
    render(<MetaTags prefetchUrl="https://client.example" />)

    const twitterSite = document.querySelector('meta[name="twitter:site"]')

    if (BRAND_TWITTER_SITE) {
      expect(twitterSite).toHaveAttribute('content', BRAND_TWITTER_SITE)
    } else {
      expect(twitterSite).not.toBeInTheDocument()
    }
  })
})
