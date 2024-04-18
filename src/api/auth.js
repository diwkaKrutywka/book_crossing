import http from '@/utils/http'

export function AuthApi(url, data, method) {
  let info = {
    url: '/' + url
  }
  if (method == 'GET') {
    info['method'] = 'GET'
    if (typeof data == 'object') {
      let str = ''
      Object.keys(data.query).forEach((e) => {
        str += e + '=' + data.query[e] + '&'
      })
      info['url'] += '?' + str.slice(0, -1)
    }
  } else {
    info['method'] = 'POST'
    info['data'] = data
  }
  return http(info)
}
