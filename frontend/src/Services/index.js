import axios from "axios";
import { makeAuth } from "./auth";
import { makeChat } from "./chat";
import { makeUser } from "./user";

const services = {};

const instance = axios.create({
  baseURL: "/api/v1",
});

services.auth = makeAuth(instance);
services.user = makeUser(instance);
services.chat = makeChat(instance);

export default services;
