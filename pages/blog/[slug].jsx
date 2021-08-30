import { getAllPosts, getPostBySlug } from '../../common/blog-data/post-data';
import MainLayout from '../../components/global/main-layout';
import markdownToHtml from '../../common/md-to-html/md-processor';
import PostBody from '../../components/post/post-body';

const BlogPost = ({ post }) => {
    console.log(post);
    return (
        <MainLayout>
            <div>
                <PostBody content={post.content} />
            </div>
        </MainLayout>
    );
}

export default BlogPost;

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'filePath',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage',
    ])
    const content = await markdownToHtml(post.content || '', post.filePath)

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}