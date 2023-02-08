export function getRedirect(redirect: string) {
  let url = redirect
  let count = 50
  const URLReg = /https?:\/\//
  while (count > 0) {
    count--
    if (URLReg.test(url)) {
      break
    } else {
      url = window.decodeURIComponent(url)
    }
  }
  return url
}
