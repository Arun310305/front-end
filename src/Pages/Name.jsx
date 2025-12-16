import styles from '../Pages/Name.module.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

   const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/projects");
          const data = await res.json();
          setProjects(data);
        } catch (err) {
          console.error("❌ Error fetching projects:", err);
        }
      };
      fetchProjects();
    }, []);
   const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setBlogs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.loading}>Loading blogs...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (blogs.length === 0) return <p className={styles.noBlogs}>No blogs found.</p>;



  const tools = [
    {
      name: "Node js",
      desc: "Backend & Frontend Development",
      logo: "/icons/nodejs.png",
    },
    {
      name: "Git",
      desc: "Version control Tool",
      logo: "/icons/git.png",
    },
    {
      name: "Java",
      desc: "Programing language",
      logo: "/icons/java.png",
    },
   
    {
      name: "SQL",
      desc: "Database",
      logo: "/icons/sql.png",
    },
    {
      name: "C++",
      desc: "Programing language",
      logo: "/icons/cplusplus.png",
    },
  ];
    return(
        <div>
            <div className={styles.maincontainer}>
                <div className={styles.role}>
                <h1>LOREMIPUSM</h1>
                <h1 className={styles.Dev}>ROLEHERE</h1>
                <p className={styles.Devtxt}>Lorem ipsum dolor sit amet consectetur. <br/> Lorem ipsum dolor sit amet consectetur. <br/> Lorem ipsum dolor sit.</p>
                </div>

                <div className={styles.numdata}>
                    <div className={styles.exp}>
                        <div className={styles.expyr} >+3</div>
                        <div className={styles.exptxt}>YEAR OF <br/> EXPERIENCES</div>
                    </div>
                    <div className={styles.projects}>
                        <div className={styles.projcount}>+12</div>
                        <div className={styles.projtxt}>PROJECTS <br/>COMPLETED</div>
                    </div>
                    <div className={styles.clients}>
                        <div className={styles.clientcnt}>+5</div>
                        <div className={styles.clienttxt}>WORLDWIDE <br/> CLIENTS</div>
                    </div>
                </div>

                <div className={styles.colorcards}>
                    <div className={styles.orangecard}>
                        <div className={styles.symbolorng}>
                           <svg className={styles.db} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                              <polyline points="2 17 12 22 22 17"></polyline>
                              <polyline points="2 12 12 17 22 12"></polyline>
                           </svg>
                        </div>
                        <div className={styles.orangetxt}><p className={styles.paratxt}>Lorem, ipsum., Lorem, ipsum dolor.</p></div>
                        <div className={styles.orangebtn}>
                            <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <g>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12,5 19,12 12,19"></polyline>
                             </g>
                             </svg></a>
                        </div>
                    </div>
                    <div className={styles.greencard}>
                        <div className={styles.symbolgrn}><svg className={styles.ui} width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" stroke="white">   
 <g stroke="#000000" stroke-width="8">
     <rect x="10" y="10" width="80" height="80" rx="8" ry="8" fill="none" />      

   <line x1="10" y1="35" x2="90" y2="35"/>      
   <line x1="35" y1="35" x2="35" y2="90"/> 
 </g>
</svg></div>
                        <div className={styles.greentxt}><p className={styles.paratxtwo}>Lorem, ipsum, lorem,ipsum</p></div>
                        <div className={styles.greenbtn}>
                            
                            <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <g>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12,5 19,12 12,19"></polyline>
                             </g>
                             </svg>
</a>
                        </div>
                    </div>
                </div>

               

            </div>
        </div>
    )
}

export default Home ;