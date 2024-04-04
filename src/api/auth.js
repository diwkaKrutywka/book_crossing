import http from '@/utils/http'
export function AuthApi(url, data, method) {
  let info = {
    url: '/' + url
  }
  if (method == 'GET') {
    info['method'] = 'GET'
  } else {
    info['method'] = 'POST'
    info['data'] = data
  }
  return http(info)
}
