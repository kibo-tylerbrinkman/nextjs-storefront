import vercelFetch from '@vercel/fetch'

import { apiAuthClient } from './api-auth-client'
import { addProtocolToHost } from './config-helpers'
import { getGraphqlUrl } from './config-helpers'

const fetch = vercelFetch()

const fetcher = async ({ query, variables }: any, options: any) => {
  const authToken = await apiAuthClient.getAccessToken()
  const response = await fetch(getGraphqlUrl(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'x-vol-user-claims': options?.userClaims,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  return await response.json()
}
export default fetcher

export const RESTFetch = async (
  url: string,
  method: string,
  body: any = undefined,
  options: any = {}
) => {
  const authToken = await apiAuthClient.getAccessToken()
  const response = await fetch(`${addProtocolToHost(process.env.KIBO_API_HOST)}/${url}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'x-vol-user-claims': options?.userClaims,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: body,
  })
  return await response.json()
}
