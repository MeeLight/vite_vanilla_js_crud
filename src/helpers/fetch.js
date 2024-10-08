'use strict'

/**
 * ## Custom Fetch
 * **NOTE:** The default content type is: `application/json`.
 * @param {string|URL|globalThis.Request} uri
 * @param {{
 *   method?: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD'|'OPTIONS',
 *   contentType: 'text/plain'|'text/html'|'application/json',
 *   body?: BodyInit|null,
 *   otherHeaders?: object,
 *   otherOptions?: RequestInit
 * }}
 * @return {Promise<Response>}
 */
export const customFetch = (
  uri,
  {
    contentType = 'application/json',
    method = 'GET',
    body = null,
    otherHeaders = {},
    otherOptions = {}
  } = {}
) => {
  return fetch(uri, {
    headers: { 'Content-Type': contentType, ...otherHeaders },
    method,
    body,
    ...otherOptions
  })
}
