let ua = navigator.userAgent, isOldVersion = false,
    version = navigator.userAgent.match(/vanke_app_version\/[0-9]+/);
    console.log(version);
    
if (/iPhone/.test(ua) && ua.toLocaleLowerCase().indexOf('micromessenger') < 0) {
  if (!version || version.length == 0 || (version[0].split("/")[1] < "2016121000")) isOldVersion = true;
} else if ((ua.indexOf('Android') >= 0 || ua.indexOf( 'Adr') >= 0) && ua.toLocaleLowerCase().indexOf('micromessenger') < 0) {
  if (!version || version.length == 0 || (version[0].split("/")[1] < "60")) isOldVersion = true;
}

export const appVersion = version && version[0].split("/")[1];

export default isOldVersion;