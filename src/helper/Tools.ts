// 数据接口域名
const API_DATA_HOST = 'http://blackpearltest.4009515151.com';
// 支付接口域名
const API_PAY_HOST = 'http://pay.4009515151.com';
// 数据接口前缀
const API_PREFIX = '/interfaces';
// android旧版本标记
const OLD_VERSION_ANDROID_SYMBOL = 60;
// ios旧版本标记
const OLD_VERSION_IOS_SYMBOL = 2016121000;

// 初始化viewport和rem值
// _preset.scss中pm的计算公式为: window.innerWidth / 10
export const initMoblieScale = () => {
  let dpr = window.devicePixelRatio;
  let scale = (1 / dpr).toFixed(4);
  let remVal = window.innerWidth / 10 * dpr;
  let viewport = document.querySelector('meta[name=viewport]');
  let viewportContent = `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`
  if (viewport) {
    viewport.setAttribute('content', viewportContent);
  } else {
    let newViewport = document.createElement('meta')
    newViewport.name = "viewport"
    newViewport.content = viewportContent;
    document.getElementsByTagName('head')[0].appendChild(newViewport);
  }
  document.getElementsByTagName('html')[0].style.fontSize = remVal + 'px';
}

// ua解析器
export const UAParser = () => {
  let info = {os: '', old_app: false, env: '', app_ver: ''}
  let ua = (navigator && navigator.userAgent) || '';
  ua = ua.toLowerCase()
  if (/iphone|ipad/.test(ua)) {
    info.os = 'ios'
  } else if(/android/.test(ua)) {
    info.os = 'android'
  } 
  if (/zhuzher/.test(ua) || /vanke_app_version/.test(ua)) {
    info.env = 'app';
    let description = ua.match(/vanke_app_version\/[0-9]+/);
    let version = description && description[0].match(/[0-9]+/);
    info.app_ver = (version && version[0]) || ''
    info.old_app = (info.os === 'ios' && Number(info.app_ver) < OLD_VERSION_IOS_SYMBOL) || (info.os === 'android' && Number(info.app_ver) < OLD_VERSION_ANDROID_SYMBOL)
  } else if (/micromessenger/.test(ua)) {
    info.env = 'wechat'
  }
  return info
}

// 调用原生方法
export const callNative = ({method, content}) => {
  let dataString = '';
  try {
    dataString = JSON.stringify({method, content});
  } catch (error) {}
  if (!dataString) return 
  const url = `/service/#/?native_service?data=${dataString}`;
  let iframe = document.createElement("IFRAME");
  iframe.setAttribute('src', url);
  iframe.setAttribute('width', 0);
  iframe.setAttribute('height', 0);
  iframe.setAttribute('frameborder', 0);
  document.documentElement.appendChild(iframe);
  setTimeout(() => {
    iframe.parentNode.removeChild(iframe);
  }, 500)
}

// 获取原生属性值
export const getNativeProps = ({method, content}, checkDataKeys) => {
  window.appEnvironment = {};
  const interval = 50;
  const timeout = 5000;
  let intervalCount = 0;
  let dataString = '';
  try {
    dataString = JSON.stringify({method, content});
  } catch (error) {}
  const url = `/service/#/?native_service?data=${dataString}`;
  let iframe = document.createElement("IFRAME");
  iframe.setAttribute('src', url);
  iframe.setAttribute('width', 0);
  iframe.setAttribute('height', 0);
  iframe.setAttribute('frameborder', 0);
  document.documentElement.appendChild(iframe);
  let timer = null;
  return new Promise((resolve, reject) => {
    console.log('pending...')
    timer = setInterval(() => {
      intervalCount += interval;
      let isReady = true
      let matchCount = 0
      for(matchCount = 0; matchCount < checkDataKeys.length; matchCount++) {
        isReady = window.appEnvironment && window.appEnvironment.hasOwnProperty(checkDataKeys[matchCount])
        if (!isReady) break
      }
      if (isReady || intervalCount > timeout) {
        iframe.parentNode.removeChild(iframe);
        console.log('done')
        clearInterval(timer);
      }
      if (isReady) resolve(true);
      if (intervalCount > timeout) reject(`match: ${matchCount}; but timeout`);      
    }, interval)
  })
}

// 解析get参数
const getQueryString = (query) => {
  return Object.keys(query).length > 0 ?
    '?' + Object.keys(query).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(query[k]))
    .join('&') : ''
}

// 参数传递配置
const getParamString = (params, method = 'GET') => {
  let result = {query: '', body: ''};
  if (['GET', 'DELETE'].indexOf(method) > -1) {
    result.query = params ? getQueryString(params) : '';
  } else if (['POST', 'PUT'].indexOf(method) > -1) {
    try {
      result.body = params ? JSON.stringify(params) : '';
    } catch (error) {
    }
  }
  return result;
}

// 调用数据API
export const dataFetch = (resource, args = null, params = null, need = ['Html_projectCode']) => {
  let argsMix = Object.assign({method: 'GET', credentials: 'include'}, args)
  let paramGroup = {}
  if (UAParser().old_app || need.length <= 0) {
    paramGroup = getParamString(params, argsMix.method)
    argsMix = paramGroup.body ? Object.assign({}, argsMix, {body: paramGroup.body}) : argsMix
    return fetch(`${API_DATA_HOST}${API_PREFIX}${resource}${paramGroup.query}`, argsMix)
  } 
  return getNativeProps({method: 'setToken'}, need).then((res) => {
    if (res) {
      const projectCode = (window.appEnvironment && window.appEnvironment['Html_projectCode']) || '';
      const token = (window.appEnvironment && window.appEnvironment['Html_token']) || '';
      params = projectCode ? Object.assign({}, params, {projectCode}) : params
      argsMix = token ? Object.assign({}, argsMix, {headers: {'X-Auth-Token': token}}): argsMix
      paramGroup = getParamString(params, argsMix.method)
      argsMix = paramGroup.body ? Object.assign({}, argsMix, {body: paramGroup.body}) : argsMix
      return fetch(`${API_DATA_HOST}${API_PREFIX}${resource}${paramGroup.query}`, argsMix)
    } else {
      return new Promise((resolve, reject) => {reject('dataFetch failed')})
    }
  })
}

// 调用支付API
export const deliveryFetch = (resource) => fetch(`${API_PAY_HOST}${API_PREFIX}${resource}`, {method: 'GET'});
