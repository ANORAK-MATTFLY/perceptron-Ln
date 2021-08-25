import style from '../../styles/about.module.scss';


const AboutBody = () => {
    return (<div id={style.container}>
        <article className={style.card}>
            <header className={style.card_header}>
                <p>
                    Software Engineer
                    <h2>Ben Matanda</h2>
                </p>
            </header>
            <div
                className={style.post_image}
                style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/talk-69661.appspot.com/o/ben.jpg?alt=media&token=733216da-a445-4393-a555-cb4d988b8f03')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            ></div>
        </article>
    </div>);
};

export default AboutBody;