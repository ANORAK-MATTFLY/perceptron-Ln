require("dotenv").config();
import gql from "graphql-tag";
import axios, { AxiosRequestConfig } from "axios";

import { Post } from "../types/post-type";

const httpConfig: AxiosRequestConfig = {
  url: "http://localhost:4000",
  method: "post",
  data: {
    query: `
    query {
      getAllPosts {
        id
        title
        content
      }
    }
    `,
  },
};

export const getAllPosts = async (): Promise<Post> => {
  try {
    return await (await axios(httpConfig)).data;
  } catch (error) {
    return error;
  }
};

export const getAuthor = gql`
  query {
    getAuthor(id: "6a8d04cd-1613-4a94-9259-abde996d4df8") {
      id
      authorName
      authorProfilePicture
    }
  }
`;

export const getPostById = gql`
  query {
    getPostById(id: "94fdc907-d2c6-440d-b62b-143aa0f07b76") {
      id
      title
      content
    }
  }
`;
