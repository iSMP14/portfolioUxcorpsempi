// @ts-check
import { defineConfig } from 'astro/config'
import { URL } from './src/data/constants'

import tunnel from 'astro-tunnel'
import icon from 'astro-icon'
import i18n from '@astrolicious/i18n'
import sitemap from 'astro-sitemap'
import compressor from 'astro-compressor'

// https://astro.build/config
export default defineConfig({
  site: URL,
  server: {
    host: true
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  compressHTML: false,
  integrations: [
    tunnel(),
    icon(),
    i18n({
      defaultLocale: 'es',
      locales: ['es', 'en']
    }),
    sitemap({
      canonicalURL: URL,
      lastmod: new Date(),
      createLinkInHead: false,
      xmlns: {
        xhtml: true,
        news: false,
        video: false,
        image: false
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es'
        }
      },
      // Remove trailing slash
      serialize(item) {
        /* eslint-disable-next-line no-param-reassign */
        item.url = item.url.replace(/\/$/g, '')
        return item
      }
    }),
    compressor()
  ]
})
