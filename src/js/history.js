export default {
  cache: new Set(),
  add(data) {
    this.cache = new Set(this.get());
    if (this.cache.has(data)) {
      this.cache.delete(data);
    }
    if (this.cache.size >= 10) {
      this.cache = Array.from(this.cache);
      this.cache.shift();
      this.cache = new Set(this.cache);
    }
    this.cache.add(data);
    localStorage.setItem('history', JSON.stringify(Array.from(this.cache)));
  },
  delete(data) {
    this.cache = new Set(this.get());
    if (this.cache.has(data)) {
      this.cache.delete(data);
    }
    localStorage.setItem('history', JSON.stringify(Array.from(this.cache)));
  },
  get() {
    try {
      this.cache = JSON.parse(window.localStorage.getItem('history') || '[]');
    } catch (error) {
      this.cache = [];
    }
    return this.cache;
  },
};
