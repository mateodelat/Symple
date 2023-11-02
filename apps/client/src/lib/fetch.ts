import { getSession } from 'next-auth/react'
import { returnResponse } from '@utils/response'

interface FetchParams {
  baseUrl: string
  method: string
  hasParser?: boolean
  options?: Record<string, any>
  body?: BodyInit
  headers?: HeadersInit
}

export const customFetch = async ({
  baseUrl,
  method,
  body,
  hasParser,
  headers = {},
  options = {}
}: FetchParams): Promise<any> => {
  const session = await getSession()
  const response = await fetch(baseUrl, {
    method,
    ...options,
    body: body ?? null,
    headers: {
      Authorization: `Bearer ${session?.accessToken as string}`,
      ...headers
    }
  })

  return await returnResponse(response, hasParser)
}
