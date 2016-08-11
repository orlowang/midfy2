import _ from 'lodash';

export default (format) => {
  let d = new Date(), T = {};
  let  datetime = '', _format = format && format.split('') || 'M-D-Y h:m:s'.split('');

  T.Y = d.getFullYear();
  T.M = d.getMonth()+1;
  T.D = d.getDate();
  T.h = d.getHours();
  T.m = d.getMinutes();
  T.s = d.getSeconds();

	for(let t in T){
		T[t] = T[t]>9 ? T[t] : '0'+T[t];
  }

  _format.forEach(function(key, i) {
    switch (key) {
      case 'Y':
        _format[i] = T.Y
        break;
      case 'D':
        _format[i] = T.D
        break;
      case 'M':
        _format[i] = T.M
        break;
      case 'h':
        _format[i] = T.h
        break;
      case 'm':
        _format[i] = T.m
        break;
      case 's':
        _format[i] = T.s
        break;
    }
  }, this);

  return _.join(_format, '');
}