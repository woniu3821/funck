export default {
  set(key, data) {
    if (typeof data == "object") {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  },
  get(key) {
    let data = localStorage.getItem(key);
    try {
      return JSON.parse(data);
    } catch (err) {
      return data;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear(key) {
    localStorage.clear();
  }
};
