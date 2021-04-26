import axios, { AxiosRequestConfig } from "axios";

import { Post } from "../../types/post-type";
import { Author } from "../../types/author-type";
import { getPosts, getAuthor, getPostById } from "./queries";

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

export const getAllPosts = async (): Promise<Array<Post>> => {
  try {
    return await (await axios(httpConfig(getPosts))).data.data.getAllPosts;
  } catch (error) {
    return error;
  }
};

export const getPostAuthor = async (): Promise<Author> => {
  try {
    return await (await axios(httpConfig(getAuthor))).data.data.getAuthor;
  } catch (error) {
    return error;
  }
};

export const getPost = async (id: String): Promise<Post> => {
  try {
    return await (
      await axios({
        url: `http://localhost:4000`,
        method: "POST",
        data: {
          query: `query {
                getPostById(id: "${id}") {
                    id
                    title
                    content
                    thumbnail
            }
          }
        `,
        },
      })
    ).data.data.getPostById;
  } catch (error) {
    return error;
  }
};
