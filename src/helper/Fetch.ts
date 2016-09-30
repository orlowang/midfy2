import 'whatwg-fetch';

export const getByREST = (args, callback) => {
  fetch(`http://test.blackpearl.4009515151.com/interfaces/${args}`, {
      credentials: 'include'
      // method: 'GET',
      // mode: 'no-cors', 
      // credentials: 'same-origin',
    }).then(res => res.json())
      .then(data => callback(data))
};

export const postByREST = (args, data, callback) => {
  fetch(`http://test.blackpearl.4009515151.com/interfaces/${args}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: data
    }).then(res => {console.log(res.headers);return res;})
      .then(res => res.text())
      .then(data => callback(JSON.parse(data)))
};


export const getDelivery = (args, callback) => {
  fetch(`http://test.pay.4009515151.com/services/delivery/query?${args}`, {
      
    }).then(res => res.json())
      .then(data => callback(data))
};