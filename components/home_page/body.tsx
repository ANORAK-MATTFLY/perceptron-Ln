import Image from "next/image";
import Link from "next/link";
import { useQuery, UseQueryResult } from "react-query";

import style from "../../styles/home-page-body.module.scss";
import {
  getAllPosts,
  getPostAuthor,
} from "../../utils/gql-api-calls/query/request-handlers";
import { Post } from "../../utils/types/post-type";
import { Author } from "../../utils/types/author-type";

const Body = () => {
  const { data, isLoading, error } = useQuery<Array<Post>>(
    "Posts",
    getAllPosts
  );

  const author: UseQueryResult<Author> = useQuery("Author", getPostAuthor);
  return (
    <main id={style.main}>
      <section id={style.card_list}>
        {data?.map(
          (post: Post): JSX.Element => (
            <Link as={`post/${post.id}`} href={"post/[content]"}>
              <article className={style.card}>
                <header className={style.card_header}>
                  <p>
                    Released on <time> {post.releaseDate} </time>
                    <h2>{post.title}</h2>
                  </p>
                </header>
                <div
                  className={style.post_image}
                  style={{
                    backgroundImage: `url(${post.thumbnail})`,
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

                  <div className={style.author_name}>
                    {author.data?.authorName}
                  </div>
                </div>
              </article>
            </Link>
          )
        )}
      </section>
    </main>
  );
};

export default Body;
