export interface QueryParam {
  key: string
  value?: string | number | null
}

export function generateQueryString(params?: QueryParam[]): string {
  if (!params || params.length === 0) {
    return ''
  }

  const queryParams = params
    .filter((param) => !!param.value)
    .map((param) => `${param.key}=${encodeURIComponent(param.value as string)}`)
  return queryParams.length ? '?' + queryParams.join('&') : ''
}
