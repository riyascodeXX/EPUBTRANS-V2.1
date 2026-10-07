import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'

import { Footer } from './Footer/config'
import { Header } from './Header/config'

import { plugins } from './plugins'

import { defaultLexical } from '@/fields/defaultLexical'

import { getServerSideURL } from './utilities/getURL'

import { Services } from './payload/collections/services'
import { Solutions } from './payload/collections/solutions'
import { Industries } from './payload/collections/Industries'
import {
  ServiceCategories,
  Technologies,
  CaseStudies,
  Resources,
  Careers,
  QuoteRequests,
} from './payload/collections/enterprise'
import { SiteSettings } from './payload/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // =======================================================
  // ADMIN
  // =======================================================

  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],

      beforeDashboard: ['@/components/BeforeDashboard'],
    },

    importMap: {
      baseDir: path.resolve(dirname),
    },

    user: Users.slug,

    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },

        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },

        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },

  // =======================================================
  // EDITOR
  // =======================================================

  editor: defaultLexical,

  // =======================================================
  // DATABASE
  // =======================================================

  db: postgresAdapter({
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  // =======================================================
  // COLLECTIONS
  // =======================================================

  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,

    // EPUBTRANS custom collections
    Services,
    Solutions,
    Industries,
    ServiceCategories,
    Technologies,
    CaseStudies,
    Resources,
    Careers,
    QuoteRequests,
  ],

  // =======================================================
  // CORS
  // =======================================================

  cors: [getServerSideURL()].filter(Boolean),

  // =======================================================
  // GLOBALS
  // =======================================================

  globals: [Header, Footer, SiteSettings],

  // =======================================================
  // PLUGINS
  // =======================================================

  plugins,

  // =======================================================
  // PAYLOAD SECRET
  // =======================================================

  secret: process.env.PAYLOAD_SECRET,

  // =======================================================
  // IMAGE PROCESSING
  // =======================================================

  sharp,

  // =======================================================
  // TYPESCRIPT
  // =======================================================

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // =======================================================
  // JOBS
  // =======================================================

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Logged-in users can run jobs
        if (req.user) {
          return true
        }

        const secret = process.env.CRON_SECRET

        if (!secret) {
          return false
        }

        const authHeader = req.headers.get('authorization')

        return authHeader === `Bearer ${secret}`
      },
    },

    tasks: [],
  },
})
