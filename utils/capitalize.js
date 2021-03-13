const Capitalize = (phrase) => {
  return phrase.replace(/\b\w/g, (c) => {
    return c.toUpperCase()
  })
}

export default Capitalize
