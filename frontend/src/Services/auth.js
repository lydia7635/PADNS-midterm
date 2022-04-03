/** @param {import("axios").AxiosInstance} instance */
export const makeAuth = (instance) => ({
  getCsrf() {
    return instance.get("/csrf");
  },
  /**
   * @param {{
   *   username: string,
   *   password: string,
   * }}
   */
  register({ username, password, avatar }) {
    return instance.post("/register", { username, password, avatar });
  },
  /**
   * @param {{
   *   username: string,
   *   password: string,
   * }}
   */
  login({ username, password }) {
    return instance.post("/login", { username, password });
  },
  logout() {
    return instance.post("/logout");
  },
});
