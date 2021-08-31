import Image from "next/image";
import { getAllPosts, getPostBySlug } from '../../common/blog-data/post-data';
import MainLayout from '../../components/global/main-layout';
import markdownToHtml from '../../common/md-to-html/md-processor';
import PostBody from '../../components/post/post-body';
import style from '../../styles/post-details.module.scss';


const BlogPost = ({ post }) => {
    return (
        <MainLayout>
            <div id={style.container}>
                <section id={style.mid_section}>
                    <PostBody content={post.content} />
                </section>
                <aside id={style.info_aside}>
                    <div id={style.image}
                        style={{
                            backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/talk-69661.appspot.com/o/ben.jpg?alt=media&token=733216da-a445-4393-a555-cb4d988b8f03')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    >
                    </div>
                    <h2>Hello 👋, I'm Ben. Nice to meet you!</h2>
                    <p>I genuinely care about people, and love helping fellow engineers work on their craft.</p>

                    <p>Follow me  on <a href="https://twitter.com/JrMatanda" target="blank">Twitter</a> 🥳</p>

                </aside>
            </div>

        </MainLayout>
    );
}

export default BlogPost;

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, [
        'title',
        // 'date',
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