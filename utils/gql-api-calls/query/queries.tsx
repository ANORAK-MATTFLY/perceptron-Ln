export const getAuthor = `
  query {
    getAuthor(id: "6a8d04cd-1613-4a94-9259-abde996d4df8") {
      id
      authorName
      authorProfilePicture
    }
  }
`;

export const getPostById = `
  query {
    getPostById(id: "94fdc907-d2c6-440d-b62b-143aa0f07b76") {
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
