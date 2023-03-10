import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import Session from 'supertokens-auth-react/recipe/session'
import ThirdPartyEmailPassword, {
  Github,
  Google,
  Apple,
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword'

import { createAuth } from '@redwoodjs/auth-supertokens-web'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'

// const websiteDomain =
//   process.env.SUPERTOKENS_WEBSITE_DOMAIN || 'http://localhost:8910'
// const apiDomain =
//   process.env.SUPERTOKENS_API_DOMAIN || `${websiteDomain}${global.RWJS_API_URL}`

const superTokensClient = {
  sessionRecipe: Session,
}

isBrowser &&
  SuperTokens.init({
    appInfo: {
      apiDomain: 'http://localhost:8910',
      websiteDomain: 'http://localhost:8910',
      appName: 'SuperTokens RedwoodJS',
      apiBasePath: '/.redwood/functions/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      Session.init(),
      ThirdPartyEmailPassword.init({
        signInAndUpFeature: {
          providers: [Github.init(), Google.init(), Apple.init()],
        },
      }),
    ],
  })

const { AuthProvider: SuperTokensAuthProvider, useAuth } =
  createAuth(superTokensClient)

const AuthProvider = (props: any) => {
  return (
    <SuperTokensWrapper>
      <SuperTokensAuthProvider>{props.children}</SuperTokensAuthProvider>
    </SuperTokensWrapper>
  )
}

export { AuthProvider, useAuth }
