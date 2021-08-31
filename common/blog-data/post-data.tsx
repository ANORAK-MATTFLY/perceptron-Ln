import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import Post from '../../types/blog-post';

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[]) {
    const realSlug: string = slug.replace(/\.md$/, '')
    const fullPath: string = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }

        if (data[field]) {
            items[field] = data[field]
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



export const postsData: Post[] = [
{
    title: 'Vscode tips for flutter',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur',
    date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
    filePath: '_posts/Vscode-tips-for-flutter.md',
    coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FVscode-tips-for-flutter%2F0%20FJIgWzkwNtLL-gwy.png?alt=media&token=1250d3fc-b14c-4ae2-a17d-d53b2c02ac14',
    slug: 'Vscode-tips-for-flutter',
    authorName: "Ben Matt",
    authorPicture: '/ben.png',
    },
    {
        title: 'Vscode tips for flutter',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Vscode-tips-for-flutter.md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FVscode-tips-for-flutter%2F0%20FJIgWzkwNtLL-gwy.png?alt=media&token=1250d3fc-b14c-4ae2-a17d-d53b2c02ac14',
        slug: 'Vscode-tips-for-flutter',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },
    {
        title: 'Vscode tips for flutter',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Vscode-tips-for-flutter.md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FVscode-tips-for-flutter%2F0%20FJIgWzkwNtLL-gwy.png?alt=media&token=1250d3fc-b14c-4ae2-a17d-d53b2c02ac14',
        slug: 'Vscode-tips-for-flutter',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },
    {
        title: 'Vscode tips for flutter',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Vscode-tips-for-flutter.md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FVscode-tips-for-flutter%2F0%20FJIgWzkwNtLL-gwy.png?alt=media&token=1250d3fc-b14c-4ae2-a17d-d53b2c02ac14',
        slug: 'Vscode-tips-for-flutter',
        authorName: "Ben Matt",
        authorPicture: '/ben.png',
    },
    {
        title: 'Vscode tips for flutter',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur',
        date: new Date('2021-02-14T19:05:27.220Z').toISOString(),
        filePath: '_posts/Vscode-tips-for-flutter.md',
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/code-rainbow.appspot.com/o/blog-posts%2FVscode-tips-for-flutter%2F0%20FJIgWzkwNtLL-gwy.png?alt=media&token=1250d3fc-b14c-4ae2-a17d-d53b2c02ac14',
        slug: 'Vscode-tips-for-flutter',
        authorName: "Ben Matt",
        authorPicture: '/Ben.png',
    }
];