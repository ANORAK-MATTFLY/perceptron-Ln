import { getAllPosts } from '../../common/blog-data/post-data';
import MainLayout from '../../components/global/main-layout';

export const BlogPost = ({ title, date, content }) => {
    return (
        <MainLayout>
            <div>
                <h2>{title}</h2>
                <h2>Hello</h2>
            </div>
        </MainLayout>
    );
}

export async function getInitialProps(context) {
    const { params } = context;
    const allPosts = getAllPosts();
    const { data, content } = allPosts.find((item) => item.slug === params.slug);
    const mdxSource = await renderToString(content);

    return {
        props: {
            ...data,
            date: data.date.toISOString(),
            content: mdxSource,
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: getAllPosts().map((post) => ({
            params: {
                slug: post.slug,
            },
        })),
        fallback: false,
    };
}