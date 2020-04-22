export const getTextLength = (text, font) => {
  const el = document.createElement('div');
  text = text.split(' ').join(String.fromCharCode(160)) // replace space with &nbsp;
  const textNode = document.createTextNode(text)
  el.appendChild(textNode)
  el.style.font = font;
  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  el.style.left = '-999px'
  el.style.top = '-999px'
  el.style.height = 'auto'

  document.body.appendChild(el)
  // let wString = getComputedStyle(el).width
  // const w = parseFloat(wString.replace('px', ''))
  const box = el.getBoundingClientRect()
  const w = box.width
  document.body.removeChild(el)
  return w
}