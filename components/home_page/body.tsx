import style from "../../styles/home-page-body.module.scss";
import Image from "next/image";
import Link from "next/link";
import { postsData } from "../../common/blog-data/post-data";
import { format, parseISO } from "date-fns";
import { useState } from "react";

const Body = () => {
  const [searchedWord, setSearchWord] = useState("");

  function postProvider(posts: Array<any>): Array<any> {
    return (
      posts.filter(
        (post) => post.title.toLocaleLowerCase().includes(searchedWord) == true
      ) || posts
    );
  }

  return (
    <main id={style.main}>
      <section id={style.card_list}>
        {postProvider(postsData).map((post) => {
          return (
            <Link key={post.slug} as={`blog/${post.slug}`} href={"blog/[slug]"}>
              <a>
                <article className={style.card}>
                  <header className={style.card_header}>
                    <p>
                      Released on{" "}
                      <time>{format(parseISO(post.date), "MMMM do, uuu")}</time>
                      <h1>{post.title}</h1>
                    </p>
                  </header>
                  <div
                    className={style.post_image}
                    style={{
                      backgroundImage: `url(${post.coverImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className={style.card_author}>
                    <a className={style.author_avatar} href="#">
                      <Image
                        src="/Ben.jpg"
                        width={40}
                        height={40}
                        alt="Picture of the author"
                      />
                    </a>
                    <svg className={style.half_circle} viewBox="0 0 106 57">
                      <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                    </svg>

                    <div className={style.author_name}>{post.authorName}</div>
                  </div>
                </article>
              </a>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default Body;

// export async function getStaticProps() {
//   const allPosts = getAllPosts([
//     'title',
//     'date',
//     'filePath',
//     'slug',
//     'author',
//     'coverImage',
//     'excerpt',
//   ])

//   return {
//     props: { allPosts },
//   }
// }
