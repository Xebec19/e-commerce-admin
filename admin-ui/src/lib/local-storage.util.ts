const LocalStorage = {
  get token() {
    return localStorage.getItem("token") || "";
  },

  set token(t: string) {
    localStorage.setItem("token", t);
  },
};

export default LocalStorage;
