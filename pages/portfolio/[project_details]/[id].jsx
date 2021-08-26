import { useRouter } from 'next/router';
import MainLayout from "../../../components/global/main-layout";
import style from '../../../styles/project-details.module.scss';
import ProjectsData from '../../../common/projects_data';

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
                            <p>Project:  Financing application</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos exercitationem illo, quas quisquam incidunt nulla sit laboriosam consequuntur officia ab unde, beatae cum molestias doloribus eius suscipit qui neque quis!</p>
                        </section> : <p></p>);
                })}

            </div>
        </MainLayout>
    )
}