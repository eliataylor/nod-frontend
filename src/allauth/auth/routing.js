import { Navigate, useLocation } from 'react-router-dom'
import { AuthChangeEvent, useAuth, useAuthChange, useAuthStatus } from './hooks'
import { AuthenticatorType, Flows } from '../lib/allauth'
import { SoloCenteredBox } from '../../components/FullscreenBg'
import { isValidUserName } from '../../screens/OnboardProfile'

export const URLs = Object.freeze({
  LOGIN_URL: '/account/login',
  COMPLETE_USER_PROFILE: '/onboarding',
  LOGIN_REDIRECT_URL: '/',
  LOGOUT_REDIRECT_URL: '/'
})

const flow2path = {}
flow2path[Flows.LOGIN] = '/account/login'
flow2path[Flows.LOGIN_BY_CODE] = '/account/login/code/confirm'
flow2path[Flows.SIGNUP] = '/account/signup'
flow2path[Flows.VERIFY_EMAIL] = '/account/verify-email'
flow2path[Flows.PROVIDER_SIGNUP] = '/account/provider/signup'
flow2path[Flows.REAUTHENTICATE] = '/account/reauthenticate'
flow2path[`${Flows.MFA_AUTHENTICATE}:${AuthenticatorType.TOTP}`] = '/account/authenticate/totp'
flow2path[`${Flows.MFA_AUTHENTICATE}:${AuthenticatorType.RECOVERY_CODES}`] = '/account/authenticate/recovery-codes'
flow2path[`${Flows.MFA_AUTHENTICATE}:${AuthenticatorType.WEBAUTHN}`] = '/account/authenticate/webauthn'
flow2path[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.TOTP}`] = '/account/reauthenticate/totp'
flow2path[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.RECOVERY_CODES}`] = '/account/reauthenticate/recovery-codes'
flow2path[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.WEBAUTHN}`] = '/account/reauthenticate/webauthn'

export function pathForFlow (flow, typ) {
  let key = flow.id
  if (typeof flow.types !== 'undefined') {
    typ = typ ?? flow.types[0]
    key = `${key}:${typ}`
  }
  const path = flow2path[key] ?? flow2path[flow.id]
  if (!path) {
    throw new Error(`Unknown path for flow: ${flow.id}`)
  }
  return path
}

export function pathForPendingFlow (auth) {
  const flow = auth.data.flows.find(flow => flow.is_pending)
  if (flow) {
    return pathForFlow(flow)
  }
  return null
}

function navigateToPendingFlow (auth) {
  const path = pathForPendingFlow(auth)
  if (path) {
    return <Navigate to={path}/>
  }
  return null
}

export function AuthenticatedRoute ({ children }) {
  const location = useLocation()
  const [, status] = useAuthStatus()
  const next = `next=${encodeURIComponent(location.pathname + location.search)}`
  if (status.isAuthenticated) {
    return children
  } else {
    return <Navigate to={`${URLs.LOGIN_URL}?${next}`}/>
  }
}

export function AuthenticatedCompletedProfileRoute ({ children }) {
  const location = useLocation()
  const me = useAuth()?.data?.user
  const next = `next=${encodeURIComponent(location.pathname + location.search)}`
  if (!me) {
    return <Navigate to={`/account/login?${next}`}/>
  }
  if (me.profile_picture && isValidUserName(me.display)) {
    return children
  } else {

    return <Navigate to={`/onboarding?${next}`}/>
  }
}


export function AnonymousRoute ({ children }) {
  const [, status] = useAuthStatus()
  if (!status.isAuthenticated) {
    return <SoloCenteredBox p={2}> { children }</SoloCenteredBox>
  } else {
    return <Navigate to={URLs.LOGIN_REDIRECT_URL}/>
  }
}

export function AuthChangeRedirector ({ children }) {
  const [auth, event] = useAuthChange()
  const location = useLocation()
  switch (event) {
    case AuthChangeEvent.LOGGED_OUT:
      return <Navigate to={URLs.LOGOUT_REDIRECT_URL}/>
    case AuthChangeEvent.LOGGED_IN:
      return <Navigate to={URLs.LOGIN_REDIRECT_URL}/>
    case AuthChangeEvent.REAUTHENTICATED: {
      const next = new URLSearchParams(location.search).get('next') || '/'
      return <Navigate to={next}/>
    }
    case AuthChangeEvent.REAUTHENTICATION_REQUIRED: {
      const next = `next=${encodeURIComponent(location.pathname + location.search)}`
      const path = pathForFlow(auth.data.flows[0])
      return <Navigate to={`${path}?${next}`} state={{ reauth: auth }}/>
    }
    case AuthChangeEvent.FLOW_UPDATED:
      const pendingFlow = navigateToPendingFlow(auth)
      if (!pendingFlow) {
        throw new Error()
      }
      return pendingFlow
    default:
      break
  }
  // ...stay where we are
  return children
}