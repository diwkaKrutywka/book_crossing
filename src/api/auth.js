import http from '@/utils/http'
export function AuthApi(url, data, method) {
  let info = {
    url: '/' + url,
    method: method || 'POST' // default to POST if method is not provided
  }

  if (method === 'GET' && data && typeof data === 'object' && data.query) {
    let str = ''
    Object.keys(data.query).forEach((e) => {
      str += e + '=' + data.query[e] + '&'
    })
    info.url += '?' + str.slice(0, -1)
  } else {
    info.data = data
  }

  return http(info)
}
