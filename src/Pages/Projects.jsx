import React, { useEffect, useState } from "react";
import styles from "../Pages/Projects.module.css";

// 🔥 Single place to control backend URL
const BASE_URL = "http://localhost:5000";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className={styles.maincontainer}>
      <div className={styles.recent}>
        <h2 className={styles.head}>RECENT</h2>
        <h2 className={styles.pro}>PROJECTS</h2>
      </div>

      <div className={styles.projodiv}>
        {projects.map((proj) => (
          <div key={proj._id} className={styles.projcard}>
            <div className={styles.projimg}>
              <img
                src={proj.image || "/fallback-image.jpg"}
                alt={proj.name}
              />
            </div>

            <div className={styles.projtxt}>
              <p className={styles.projhead}>{proj.name}</p>
              <p className={styles.projdes}>{proj.description}</p>
            </div>

            {proj.link && (
              <div className={styles.upicon}>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className={styles.upiconsvg}
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="7"
                      y1="17"
                      x2="17"
                      y2="7"
                      stroke={"#ff6b35"}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="13,7 17,7 17,11"
                      stroke={"#ff6b35"}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;