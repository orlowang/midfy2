!getDeviceId() && deviceTest(MIDFY.api, MIDFY.doExistDevice)
function deviceTest(api, callback){
  window.ENV_DPR = window.devicePixelRatio.toString();
  window.ENV_SCREEN_WIDTH = window.screen.width.toString();
  window.ENV_VIEWPORT_WIDTH = window.innerWidth.toString();
  window.ENV_USERAGENT = navigator.userAgent;
  window.ENV_PLATFORM = navigator.platform;
  window.ENV_VENDOR = navigator.vendor;
  window.ENV_LANGUAGE = navigator.language
  fetch(api, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      operatingSystem:        window.ENV_PLATFORM,
      screenSize:             window.ENV_SCREEN_WIDTH,
      screenViewportSize:     window.ENV_VIEWPORT_WIDTH,
      screenDpr:              window.ENV_DPR,
      acceptLanguage:         window.ENV_LANGUAGE,
      userAgent:              window.ENV_USERAGENT
    })
  }).then(function(res){
    return res.text()
  }).then(function(data){
    callback(data)
  })
}
function getDeviceId() {
  var __cookie_list = document.cookie.split(';');
  for (var i = 0; i < __cookie_list.length; i++) {
    var __cookie_name = __cookie_list[i].split('=');
    return __cookie_name[0] == "MIDFYDEVICEID" ? __cookie_name[1] : null
  }
}