import axios from "axios";
import { makeAuth } from "./auth";
import { makeChat } from "./chat";

const services = {};

const instance = axios.create({
  baseURL: "/api/v1",
});

services.auth = makeAuth(instance);
services.chat = makeChat(instance);

export default services;
