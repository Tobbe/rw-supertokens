import * as Session from 'supertokens-node/recipe/session'
import ThirdPartyEmailPassword, {
  Google,
  Github,
  Apple,
} from 'supertokens-node/recipe/thirdpartyemailpassword'
import type { TypeInput } from 'supertokens-node/types'

const jwksIssuerUrl = {} // { issuer: `${apiDomain}${apiBasePath}` }

export const config: TypeInput = {
  framework: 'express',
  isInServerlessEnv: true,
  appInfo: {
    apiDomain: 'http://localhost:8910',
    websiteDomain: 'http://localhost:8910',
    appName: 'SuperTokens RedwoodJS',
    websiteBasePath: '/auth',
    apiBasePath: '/.redwood/functions/auth',
  },
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        Google({
          clientId: process.env.SUPERTOKENS_GOOGLE_CLIENT_ID,
          clientSecret: process.env.SUPERTOKENS_GOOGLE_CLIENT_SECRET,
        }),
        Github({
          clientId: process.env.SUPERTOKENS_GITHUB_CLIENT_ID,
          clientSecret: process.env.SUPERTOKENS_GITHUB_CLIENT_SECRET,
        }),
        Apple({
          clientId: process.env.SUPERTOKENS_APPLE_CLIENT_ID,
          clientSecret: {
            keyId: process.env.SUPERTOKENS_APPLE_SECRET_KEY_ID,
            privateKey: process.env.SUPERTOKENS_APPLE_SECRET_PRIVATE_KEY,
            teamId: process.env.SUPERTOKENS_APPLE_SECRET_TEAM_ID,
          },
        }),
      ],
    }),
    Session.init({
      jwt: { enable: true, ...jwksIssuerUrl },
    }),
  ],
}
