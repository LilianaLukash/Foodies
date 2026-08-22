export const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  getJSON(key) {
    const raw = this.get(key);
    if (raw == null || raw === '') return null;

    try {
      return JSON.parse(raw);
    } catch {
      this.remove(key);
      return null;
    }
  },

  setJSON(key, value) {
    try {
      return this.set(key, JSON.stringify(value));
    } catch {
      return false;
    }
  },
};
