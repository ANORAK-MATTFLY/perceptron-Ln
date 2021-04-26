import ReactMarkdown from "react-markdown";
import React from "react";
import gfm from "remark-gfm";
import { Post } from "../../utils/types/post-type";
import { getPost } from "../../utils/gql-api-calls/query/request-handlers";
import { GetServerSideProps, GetServerSidePropsResult } from "next";

const PostContent = (props: Post) => {
  const { ...post } = props;
  console.log(post);
  let markdown: string = `${post.content}`;
  return (
    <ReactMarkdown remarkPlugins={[[gfm, { singleTilde: false }]]}>
      {markdown}
    </ReactMarkdown>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<Post>> => {
  const postId: String = `${context.query.content}`;
  let post: Post = await getPost(`${postId}`).then((res) => res);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...post,
    },
  };
};

export default PostContent;
