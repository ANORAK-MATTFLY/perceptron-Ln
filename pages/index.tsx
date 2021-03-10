import Head from 'next/head'
import style from '../styles/index.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faCoffee, faHome, faTags } from '@fortawesome/free-solid-svg-icons'



export default function Home() {
  return (
    <div id={style.container}>
      <head>
<title></title>
<meta name="description" content="" />
<meta property="og:type" content="website" />
<meta name="og:title" property="og:title" content="" />
<meta name="og:description" property="og:description" content="" />
<meta property="og:site_name" content="" />
<meta property="og:url" content="" />  
<meta name="twitter:card" content="summary" /> 
<meta name="twitter:title" content="" />
<meta name="twitter:description" content={props.desc} />
<meta name="twitter:site" content="" />
<meta name="twitter:creator" content="" />
<link rel="icon" type="image/png" href="/static/images/favicon.ico" />
<link rel="apple-touch-icon" href="/static/images/favicon.ico" />
<link rel="stylesheet" href="" />
<meta property="og:image" content="" />  
<meta name="twitter:image" content="" />   
<link rel="canonical" href="" />
<script type="text/javascript" src="" ></script>
</head>
      <nav>
        {/* Main title */}
        <Link href="#">
        <a>Perceptron@Ln</a>
        </Link>
        {/* navbar links */}
        <ul>
          <li>
            <Link href="#">
              <a href="#">
                  <FontAwesomeIcon icon={faHome} className="LinkIcon" />
                Home</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a href="#">
                <FontAwesomeIcon icon={faTags} className="LinkIcon" />
                Tags</a>
            </Link>
          </li>
          <Link href="#">
          <li>
              <a href="#">
                <FontAwesomeIcon icon={faAt} className="LinkIcon" />
                About_me</a>
          </li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}
