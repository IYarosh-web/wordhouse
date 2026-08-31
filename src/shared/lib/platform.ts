export function isMacPlatform() {
  const userAgent = navigator.userAgent.toLowerCase();
  // Ищем слово 'mac' и убеждаемся, что это не iPhone
  return userAgent.indexOf("mac") > -1 && userAgent.indexOf("iphone") === -1;
}
