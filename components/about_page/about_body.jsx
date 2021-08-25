import style from '../../styles/about.module.scss';
import AboutTexts from '../../assets/text/text';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAndroid,
    faBlogger,
    faChrome,
    faDev,
    faGithub,
    faTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faBlog, faMobile, faPhone, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';

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
        <div className={style.about_me}>
            <h1>{AboutTexts.greetings}</h1>
            <p>{AboutTexts.about_me}</p>
            <div id={style.skills_and_strengths}>
                <div id={style.main_rows}>
                    <div id={style.row_head}><FontAwesomeIcon icon={faMobile} id={style.icon} />
                        <h2>Mobile</h2>
                    </div>
                    <div id={style.description}>
                        <p>
                            I value simple content structure, clean design patterns, and thoughtful interactions.
                        </p>
                    </div>
                </div>
                <div id={style.main_rows}>
                    <div id={style.row_head}>
                        <FontAwesomeIcon icon={faChrome} id={style.icon} />
                        <h2>Web</h2>
                    </div>
                    <div id={style.description}>
                        <p>
                            I like to code things from scratch, and enjoy bringing ideas to life in the browser.
                        </p>
                    </div>
                </div>
                <div id={style.main_rows}>
                    <div id={style.row_head}>
                        <FontAwesomeIcon icon={faYoutube} id={style.icon} />
                        <h2>Mentor</h2>
                    </div>
                    <div id={style.description}>
                        <p>
                            I genuinely care about people, and love helping fellow designers work on their craft through my
                        </p>
                        <a href="https://www.youtube.com/channel/UCaZslnwpO3OvakjFYWV2uJA" target="_blank">
                            Youtube channel
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>);
};

export default AboutBody;