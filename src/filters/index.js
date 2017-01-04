const urlParser = document.createElement('a')

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function count (arr) {
  return arr.length
}

export function prettyDate (date) {
  var a = new Date(date)
  return a.toDateString()
}

export function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }

  return time + label + 's'
}

export function capitalize (value) {
  if (!value) return ''
  value = value.toString()
  value.toLowerCase()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function reverse (dataIn) {
  return dataIn.split('-').reverse().join('/')
}
