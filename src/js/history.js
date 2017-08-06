export default {
  cache: new Set(),
  add: function (data) {
    console.log('data='+data)
    this.cache = new Set(this.get())
    if (this.cache.has(data)) {
      this.cache.delete(data)
      console.log('==')
      console.log(this.cache)
    }
    if (this.cache.size >= 10) {
      this.cache = Array.from(this.cache)
      this.cache.shift()
      this.cache = new Set(this.cache)
    }
    this.cache.add(data)
    console.log(this.cache)
    localStorage.setItem('history', JSON.stringify(Array.from(this.cache)))
  },
  delete: function (data) {
    this.cache = new Set(this.get())
    if(this.cache.has(data)) {
      this.cache.delete(data)
    }
    localStorage.setItem('history', JSON.stringify(Array.from(this.cache)))
  },
  get: function (data) {
    try {
      this.cache = JSON.parse(window.localStorage.getItem('history') || '[]')
    } catch (error) {
      this.cache = []
    }
    return this.cache
  }
}