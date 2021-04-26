export const getAuthor = `
  query {
    getAuthor(id: "5f0b2010-d0b4-4fcb-b68a-209620e4c811") {
      id
      authorName
      authorProfilePicture
    }
  }
`;

export const getPostById = (id: String) => `
  query {
    getPostById(id: ${id}) {
      id
      title
      content
      thumbnail
    }
  }
`;

export const getPosts = `
  query {
    getAllPosts {
      id
      title
      content
      thumbnail
    }
  }
  `;
