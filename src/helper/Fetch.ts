import 'whatwg-fetch';

type getTokenType = {
  Mobile_ShowShareButton?: string,
  Mobile_GoodSid?: string,
  Html_ProjectCode?: string,
  Html_token?: string
}

export function getToken(option:getTokenType) {
  location.href = `/#/?native_service?data={"method": "initWithBlackpearl", "content": ${JSON.stringify(option)} }`;
}

let checkToken = (cb, option?:{}) => {
  getToken(option)
  let checker = setInterval(() => {
    if(window.appEnvironment){
      cb({
        token: window.appEnvironment['Html_token'],
        prjid: window.appEnvironment['Html_projectCode']
      })
      clearInterval(checker);
    }
  }, 1);
};

export const getByREST = (args, callback, option?:{}) => {
  checkToken(data => {
    let headers = {}, filter = '';
    if(data != "guest") {
      headers["X-Auth-Token"] = data.token;
    }
    filter = `projectcode=${data.prjid}`;
    fetch(`//blackpearltest.4009515151.com/interfaces/${args}${filter}`, {
        credentials: 'include',
        headers: { headers }
      }).then(res => {
        console.log(res.headers);
        return res.json()
      })
        .then(data => callback(data))
  }, option)
};

export const postByREST = (args, data, callback, option?:{}) => {
  let headers = checkToken(data => {
    let headers = {}, filter = '';
    if(data != "guest") {
      return { "X-Auth-Token": data.token}
    }
  }, option)
  setTimeout(() => {
    fetch(`//blackpearltest.4009515151.com/interfaces/${args}`, {
      method: 'POST',
      headers: { headers },
      credentials: 'include',
      body: data
    }).then(res => {console.log(res.headers);return res;})
      .then(res => res.text())
      .then(data => callback(JSON.parse(data)))
  }, 200);
};


export const getDelivery = (args, callback) => {
  fetch(`//test.pay.4009515151.com/services/delivery/query?${args}`, {
      
    }).then(res => res.json())
      .then(data => callback(data))
};