import 'whatwg-fetch';

export const getByREST = (args, callback) => {
  fetch(`http://test.blackpearl.4009515151.com/interfaces/${args}`, {
      credentials: 'include'
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
    }).then(res => res.json())
      .then(data => callback(data))
};