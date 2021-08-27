import { useRouter } from 'next/router';
import MainLayout from "../../../components/global/main-layout";
import style from '../../../styles/project-details.module.scss';
import ProjectsData from '../../../common/projects_data';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export default function Person() {
    const pageRouter = useRouter();
    const projectData = pageRouter.query;
    return (
        <MainLayout>
            <div id={style.container}>
                {ProjectsData.map(project => {
                    return (project.id == projectData.id ?
                        <section id={style.description}>
                            <h1>Description</h1>
                            <p>Project:  {project.name}</p>
                            <p>{project.description}</p>
                        </section>



                        : null);

                })}

                <section id={style.screenshots}>
                    <Carousel>
                        {ProjectsData.map(project => {
                            return (project.id == projectData.id ?
                                project.screenshots.map(screenshot => {
                                    return (
                                        <img src={screenshot}
                                            width="60px"
                                            height="80px"
                                            aria-expanded="true"
                                        />
                                    )
                                })
                                : <p></p>);
                        })}
                    </Carousel>
                </section>

            </div >
        </MainLayout >
    )
}