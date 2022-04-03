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

  deleteMessage({ id }) {
    return instance.delete("/message", { data: { id } });
  },

  getMessages() {
    return instance.get("/messages");
  },
});
