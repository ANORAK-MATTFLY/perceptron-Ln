const gqlMutations = {
  createPost: `
  createPost(
    title: ${String}
    content: ${String}
    )
`,
  deletePost: `
  deletePost(
    id: ${String}
    ):
  `,
  updatePost: `
  updatePost(
    id: ${String}
    title: ${String}
    content: ${String}
    thumbnail: ${String}
    ):`,
};

export default gqlMutations;
