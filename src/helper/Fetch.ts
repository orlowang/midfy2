// import 'promise-polyfill';
import 'whatwg-fetch';
import isOldVersion from '../helper/version';

type getTokenType = {
  Mobile_ShowShareButton?: string,
  Mobile_GoodSid?: string,
  Html_ProjectCode?: string,
  Html_token?: string
}

type callNativeProps = {
  handle: string,
  query?: {},
  data?: string[]
}

Array.prototype["Unique"] = function() {
	var n = {},r=[];
	for(var i = 0; i < this.length; i++) {
		if (!n[this[i]]) {
			n[this[i]] = true;
			r.push(this[i]);
		}
	}
	return r;
}

export let syncCallNative = (props:callNativeProps, cb?:Function) => {
  
  if (window.appEnvironment) {
    if (window.appEnvironment['Html_projectCode']) localStorage.setItem('PROJECT_CODE_CACHE', window.appEnvironment['Html_projectCode']);
    if (window.appEnvironment['Html_token']) localStorage.setItem('TOKEN_CACHE', window.appEnvironment['Html_token']);
  }

  window['appEnvironment'] = null;
  // rules here can be change by situation
  let ua = navigator.userAgent, url = `${location.origin}/service/#/?native_service?data={ "method": `;
  if (/iPhone/.test(ua)) {
    url += `"${props.handle}"`;
    if (props.query) url += `, "content": ${JSON.stringify(props.query)}`;
  } else {
    url += `${props.handle}`;
    if (props.query) url += `, "content": ${JSON.stringify(props.query)}`;
  }
  url += " }";
  console.log("[ message ]: send fetch ... ");
  
  let i = document.createElement("iframe");
  // i.src = encodeURI(url);
  i.src = url;
  // i.name = props.handle;
  i.style.width = "0";
  i.style.height = "0";
  document.body.appendChild(i);
  // if (props.query) {
  //   let i = document.createElement("iframe");
  //   i.src = url;
  //   document.body.appendChild(i);
  //   i.parentNode.removeChild(i);
  // }

  if (props.data) {
    // let maybeguest = setTimeout(function() {
    //     console.log("[ message ]: fetch token success ! token is" + window['appEnvironment']['Html_token']);
    //     clearInterval(checker)
    //     clearTimeout(maybeguest)
    //     i.parentNode.removeChild(i)
    //     // cb(window[props.data[0]])
    //     cb(window['appEnvironment'])
    // }, 2000);
    let checker = setInterval(() => {
      let ready = [], _data = {};
      props.data.map((data) => {
        // ready.push(!!window[data])
        if (window['appEnvironment']){
          ready.push(!!window['appEnvironment'][data])
        }
      })
      if (ready.Unique().length == 1 && ready.Unique()[0] == true) {
        console.log("[ message ]: fetch token success ! token is" + window['appEnvironment']['Html_token']);
        clearInterval(checker)
        i.parentNode.removeChild(i)
        // cb(window[props.data[0]])
        cb(window['appEnvironment'])
      }
    }, 100)
  } else {
    i.parentNode.removeChild(i)
  }
}

const slat = '8fsDSU2d8fk93jsHJdmK';
export const getByREST = (args, callback, ifneed?:boolean) => {
  if (isOldVersion && location.href.indexOf(slat) < 0) {
    fetch(`//blackpearltest.4009515151.com/interfaces/${args}`, {
        credentials: 'include'
      }).then(res => res.json())
        .then(data => callback(data))
  } else {
    if (!ifneed) {
      syncCallNative({
        handle: "setToken",
        data: ['Html_projectCode']
      }, (data) => {
        let projectCodeInCache = localStorage.getItem('PROJECT_CODE_CACHE') || '';
        let tokenInCache = localStorage.getItem('TOKEN_CACHE') || '';

        let Html_projectCode = data.Html_projectCode ? data.Html_projectCode : projectCodeInCache;
        let Html_token = data.Html_token ? data.Html_token : tokenInCache;

        let filter = `projectCode=${Html_projectCode}`,
            headers = !Html_token ? {} : { "X-Auth-Token": Html_token };
        console.log(`start fetch ===> //blackpearltest.4009515151.com/interfaces/${args}${filter}`);
        
        fetch(`//blackpearltest.4009515151.com/interfaces/${args}${filter}`, {
            credentials: 'include',
            headers: headers
          }).then(res => res.json())
            .then(data => callback(data))
      });
    } else {
      fetch(`//blackpearltest.4009515151.com/interfaces/${args}`, {
          credentials: 'include'
        }).then(res => res.json())
          .then(data => callback(data))
    }
  }
};

export const postByREST = (args, data, callback) => {
  if ((isOldVersion && location.href.indexOf(slat) < 0)) {
    setTimeout(() => {
      fetch(`//blackpearltest.4009515151.com/interfaces/${args}`, {
        method: 'POST',
        credentials: 'include',
        body: data
      }).then(res => {console.log(res.headers);return res;})
        .then(res => res.text())
        .then(data => callback(JSON.parse(data)))
    }, 200);
  } else {
    syncCallNative({
      handle: "setToken",
      data: ["Html_token"]
    }, (cb) => {
      fetch(`//blackpearltest.4009515151.com/interfaces/${args}`, {
        method: 'POST',
        headers: { "X-Auth-Token": cb['Html_token'] },
        credentials: 'include',
        body: data
      }).then(res => {console.log(res.headers);return res;})
        .then(res => res.text())
        .then(data => callback(JSON.parse(data)))
    })
  }
};


export const getDelivery = (args, callback) => {
  fetch(`//pay.4009515151.com/services/delivery/query?${args}`, {
      
    }).then(res => res.json())
      .then(data => callback(data))
};