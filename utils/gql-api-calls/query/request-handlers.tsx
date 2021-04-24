import axios, { AxiosRequestConfig } from "axios";

import { Post } from "../../types/post-type";
import { getPosts } from "./queries";

const httpConfig = (query: string) => {
  let axiosRequestConfig: AxiosRequestConfig = {
    url: `http://localhost:4000`,
    method: "POST",
    data: {
      query: query,
    },
  };
  return axiosRequestConfig;
};

export const getAllPosts = async (): Promise<Post> => {
  console.log(process.env.BLOGGING_SERVICE_ENDPOINT);
  try {
    return await (await axios(httpConfig(getPosts))).data;
  } catch (error) {
    return error;
  }
};
