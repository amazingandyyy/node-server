const parse = (string) => {
  const splitted = string.split('&')
  return splitted.reduce((a, c) => {
    const k = c.split('=')[0]
    const v = c.split('=')[0]
    a[k] = v
    return a
  }, {})
}

module.exports = { parse }
