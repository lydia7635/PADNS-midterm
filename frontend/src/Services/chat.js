/** @param {import("axios").AxiosInstance} instance */
export const makeChat = (instance) => ({
  /**
   * @param {{
   *   message: string,
   * }}
   */
  createMessage({ message }) {
    return instance.post("/message", { message });
  },

  getMessages() {
    return instance.get("/messages");
  },
});
