import style from "../../styles/home-page-body.module.scss";
import Image from "next/image";
import { getAllPosts } from '../../common/blog-data/post-data';


const Body = ({ allPosts }) => {
  const posts = allPosts[0];
  console.log(allPosts);
  return (
    <main id={style.main}>
      <section id={style.card_list}>
        {
          posts.map(post => {
        <article className={style.card}>
        <header className={style.card_header}>
          <p>
            Released on <time>May 25th 2020</time>
            <h2>Beautiful card</h2>
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

          <div className={style.author_name}>Jeff Delaney</div>
        </div>
      </article>
          })}
      </section>
    </main>
  );
};

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
  ])

  return {
    props: { allPosts },
  }
}
export default Body;
