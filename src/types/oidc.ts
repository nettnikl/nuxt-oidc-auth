import type { SearchParameters } from 'ofetch'
import type { EncryptedToken } from '../runtime/server/utils/security'

export interface OAuthOidcConfig {
  /**
   * Client ID - Required by OIDC spec
   */
  clientId: string
  /**
   * Client Secret
   */
  clientSecret: string
  /**
   * Response Type - Required by OIDC spec
   * @default 'code'
   */
  responseType?: 'code' | 'code token' | 'code id_token' | 'id_token token' | 'code id_token token'
  /**
   * Authentication scheme
   * @default 'header'
   */
  authenticationScheme?: 'header' | 'body'
  /**
   * Response Mode
   */
  responseMode?: 'query' | 'fragment' | 'form_post'
  /**
   * Authorization Endpoint URL
   */
  authorizationUrl?: string
  /**
   * Token Endpoint URL
   */
  tokenUrl?: string
  /**
   * Userinfo Endpoint URL
   */
  userinfoUrl?: string
  /**
   * Redirect URI - Required by OIDC spec
   */
  redirectUri?: string
  /**
   * Grant Type
   * @default 'authorization_code'
   */
  grantType?: 'authorization_code' | 'refresh_token'
  /**
   * Scope - 'openid' required by OIDC spec
   * @default ['openid']
   * @example ['openid', 'profile', 'email']
   */
  scope?: string[]
  /**
   * Use PKCE (Proof Key for Code Exchange)
   * @default false
   */
  pkce?: boolean
  /**
   * Use state parameter with a random value. If state is not used, the nonce parameter is used to identify the flow.
   * @default true
   */
  state?: boolean
  /**
   * Use nonce parameter with a random value.
   * @default false
   */
  nonce?: boolean
  /**
   * User name claim that is used to get the user name from the access token as a fallback in case the userinfo endpoint is not provided or the userinfo request fails.
   * @default ''
   */
  userNameClaim?: string
  /**
   * Claims to be extracted from the id token
   * @default []
   */
  optionalClaims?: string[]
  /**
   * Logout Endpoint URL
   * @default ''
   */
  logoutUrl?: string
  /**
   * Include scope in token request
   * @default false
   */
  scopeInTokenRequest?: boolean
  /**
   * Token request type
   * @default 'form'
   */
  tokenRequestType?: 'form' | 'json'
  /**
   * Audience used for token validation (not included in requests by default, use additionalTokenParameters or additionalAuthParameters to add it)
   */
  audience?: string
  /**
   * Required properties of the configuration that will be validated at runtime
   */
  requiredProperties: (keyof OAuthOidcConfig)[];
  /**
   * Filter userinfo response to only include these properties
   */
  filterUserinfo?: string[]
  /**
   * Skip access token parsing (for providers that don't follow the OIDC spec/don't issue JWT access tokens)
   */
  skipAccessTokenParsing?: boolean
  /**
   * Query parameter name for logout redirect. Will be appended to the logoutUrl as a query parameter.
   */
  logoutRedirectParameterName?: string
  /**
   * Additional parameters to be added to the authorization request
   */
  additionalAuthParameters?: Record<string, string>
  /**
   * Additional parameters to be added to the token request
   */
  additionalTokenParameters?: Record<string, string>
  /**
   * OpenID Configuration object or function promise that resolves to an OpenID Configuration object
   */
  openIdConfiguration?: Record<string, unknown> | ((config: any) => Promise<Record<string, unknown>>)
  /**
   * Validate access token
   * @default true
   */
  validateAccessToken?: boolean
  /**
   * Validate id token
   * @default true
   */
  validateIdToken?: boolean
}

export interface AuthSession {
  state: string
  nonce: string
  codeVerifier: string
  redirect: string
}

export interface PersistentSession {
  exp: number
  iat: number
  accessToken: EncryptedToken
  refreshToken: EncryptedToken
}

export interface TokenRequest {
  client_id: string
  code: string
  grant_type: string
  redirect_uri?: string
  scope?: string
  state?: string
  code_verifier?: string
  client_secret?: string
}

export interface TokenRespose {
  access_token: string
  token_type: string
  expires_in: string
  refresh_token?: string
  id_token?: string
}

export interface RefreshTokenRequest {
  client_id: string
  grant_type: 'refresh_token'
  refresh_token: string
  scope?: string
  client_secret?: string
  redirect_uri?: string
}

export interface AuthorizationRequest extends SearchParameters {
  client_id: string
  response_type: string
  scope?: string
  response_mode?: string
  redirect_uri?: string
  state?: string
  nonce?: string
}

export interface PkceAuthorizationRequest extends AuthorizationRequest {
  code_challenge: string
  code_challenge_method: string
}

export interface AuthorizationResponse {
  code: string
  state?: string
  id_token?: string
}

export interface OidcProviderConfig extends Omit<OAuthOidcConfig, 'requiredProperties'> {
  baseUrl?: string
  requiredProperties: (keyof OidcProviderConfig)[]
}