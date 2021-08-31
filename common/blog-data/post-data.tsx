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

    const items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug;
        }
        if (field === 'content') {
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



export const postsData: Post[] = [
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
    // Credit Card View In Flutter
];