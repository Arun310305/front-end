
import styles from "../Pages/Tools.module.css";

function Tools() {  
     const tools = [
    {
      name: "Figma",
      desc: "UI & UX Design",
      logo: "/icons/figma.avif",
    },
    {
      name: "Wire sketch",
      desc: "UI & UX Design",
      logo: "/icons/wiresketch.webp",
    },
    {
      name: "react js",
      desc: "Backend & Frontend Development",
      logo: "/icons/react.png",
    },
    {
      name: "Node js",
      desc: "Backend & Frontend Development",
      logo: "/icons/nodejs.png",
    },
    {
      name: "Flask",
      desc: "Backend & Frontend Development",
      logo: "/icons/flask.png",
    },
    {
      name: "FastAPI",
      desc: "Backend & Frontend Development",
      logo: "/icons/fastapi.png",
    },
    {
      name: "Git",
      desc: "Version control Tool",
      logo: "/icons/git.png",
    },
    
  ];


    return(
        <section id='tools' className={styles.maincontainer}>

        
                     <div className={styles.recent}>
                        <h2 className={styles.head1}>SKILLED</h2>
                        <h2 className={styles.pro}>TOOLS</h2>
                        </div>
                        {/* 🔥 PREMIUM TOOLS SECTION */}
                <div className={styles.toolsSection}>
                 
        
                  <div className={styles.toolsGrid}>
                    {tools.map((tool, index) => (
                      <div className={styles.toolCard} key={index}>
                        <div className={styles.logobox}>
                        <img src={tool.logo} alt={tool.name} className={styles.toolIcon} /></div>
                        <div className={styles.toolInfo}>
                          <h3>{tool.name}</h3>
                          <p>{tool.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
        </section>
    )
}

export default Tools;