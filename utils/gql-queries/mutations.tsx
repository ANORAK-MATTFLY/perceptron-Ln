const gqlMutations = {
  createPost: `
  createPost(
    title: ${this}
    content: ${this}
    )
`,
  deletePost: `
  deletePost(
    id: ${this}
    ):
  `,
  updatePost: `
  updatePost(
    id: ${this}
    title: ${this}
    content: ${this}
    ):`,
};

export default gqlMutations;
