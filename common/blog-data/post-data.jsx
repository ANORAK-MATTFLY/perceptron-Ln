import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import Post from '../../types/blog-post';

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug, fields = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field == 'slug') {
            items[field] = realSlug;
        }
        if (field == 'content') {
            items[field] = content;
        }

        if (data[field]) {
            items[field] = data[field];
        }
    })

    return items;
}

export function getAllPosts(fields = []) {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}



export const postsData = [
    {
        title: 'Master Objects in JS 🍨 (Part 1)',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Master Objects in JS 🍨 (Part 1).md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2Fjs%20objects%2FRouge%2C%20Blanc%20et%20Noir%20Avant-garde%20Maximalisme%20Sport%20YouTube%20Outro.jpg?alt=media&token=5c8437fe-6d41-47fc-ab8d-6967782665d8',
        slug: 'Master Objects in JS 🍨 (Part 1)',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },

    {
        title: 'Master Objects in JS 🍨 (Part 2)',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Master Objects in JS (Part 2).md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2Fjs%20objects%2Fjs%20objects%20part%202.jpg?alt=media&token=9c898b27-ce2c-4582-8779-c4a992abae6f',
        slug: 'Master Objects in JS 🍨 (Part 2)',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },

    {
        title: 'Master Objects in JS 🍨 (Part 3)',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Master Objects in JS 🍨 (Part 3).md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2Fjs%20objects%2Fjs%20objects%20part%203.jpg?alt=media&token=f0a66c27-d9a6-49ce-a366-c27eb4f74c0f',
        slug: 'Master Objects in JS 🍨 (Part 3)',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },

    {
        title: 'Flutter DDD',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Flutter DDD.md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2Fjs%20objects%2Fjs%20objects%20part%203.jpg?alt=media&token=f0a66c27-d9a6-49ce-a366-c27eb4f74c0f',
        slug: 'Flutter DDD',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },

    {
        title: 'Vscode tips for flutter',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Vscode-tips-for-flutter.md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FVscode-tips-for-flutter%2F0%20FJIgWzkwNtLL-gwy.png?alt=media&token=1250d3fc-b14c-4ae2-a17d-d53b2c02ac14',
        slug: 'Vscode-tips-for-flutter',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },
    {
        title: 'Build a video streaming app in Flutter',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Video streaming in Flutter.md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FVideo%20streaming%20in%20Flutter%2F1Qb9cz8TRaUf7EhLgzGtNDw.png?alt=media&token=a1e531b8-b23c-4b1a-abaa-e8f695e4f482',
        slug: 'Video streaming in Flutter',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },
    {
        title: 'Feature discovery in Flutter',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Feature discovery in Flutter.md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFeature%20discovery%20in%20Flutter%2F1GvGPDhY0Toighyl3ymAWIA.png?alt=media&token=90f33050-5902-4c78-995a-3c1dba245b89',
        slug: 'Feature discovery in Flutter',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },
    {
        title: 'Flutter isolates',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Flutter isolates.md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FFlutter%20isolates%2FsJ6e_WnpL.png?alt=media&token=d3558068-851e-4744-941c-9b2ffb136c74',
        slug: 'Flutter isolates',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },
    {
        title: 'Flutter dependency injection',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Flutter dependency injection.md',
        coverImage: 'https://res.cloudinary.com/practicaldev/image/fetch/s--bpxil23_--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://miro.medium.com/max/1250/1%2AYk8aoVl3OWk0-pyG8499Bg.png',
        slug: 'Flutter dependency injection',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },
    {
        title: 'Credit Card View In Flutter',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Credit Card View In Flutter.md',
        coverImage: 'https://i.imgur.com/Tf9VA7t.gif',
        slug: 'Credit Card View In Flutter',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },

];