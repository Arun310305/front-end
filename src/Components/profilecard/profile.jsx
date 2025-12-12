import styles from './profile.module.css';

function Profile() {
    return(
        <div className={styles.maincontainer}>
            <div className={styles.curvedashlineone}>
               <svg width="250" height="200" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 220 370 Q 240 380 390 380 Q 560 360 570 100" 
                   fill="none" 
                   stroke="#821200" 
                   stroke-width="12" 
                   stroke-dasharray="46,18" 
                   stroke-linecap="butt"/>
               </svg>
            </div>
            <div className={styles.imgcontainer}>
                <img src="/icons/me2.5.jpg" alt="" className={styles.image}/>
            </div>
            <div className={styles.namecontainer}>
                <p>Name</p>
            </div>
            <div className={styles.curvedashline}>
             <svg width="200" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">   
               <path d="M 250 30 Q 240 150 0 130" fill="none" stroke="#821200" stroke-width="10" stroke-dasharray="30,10" stroke-linecap="butt"/>      
               <circle cx="250" cy="30" r="30" fill="#821200"/>      
               <g transform="translate(250, 30) scale(2.2) translate(-244, -30)">
                 <path d="M 239.46 27.155 C 239.434 28.375 239.624 29.486 240.789 30.281 C 240.727 29.923 240.651 29.569 240.607 29.21 C 240.405 27.569 240.563 25.99 241.663 24.586 C 242.282 23.793 243.085 23.181 244.077 22.671 C 243.994 22.926 243.906 23.124 243.867 23.33 C 243.695 24.229 244.026 25.008 244.72 25.636 C 245.23 26.097 245.818 26.494 246.404 26.882 C 247.446 27.574 248.299 28.393 248.744 29.496 C 249.804 32.128 248.67 35.009 245.698 36.238 C 242.916 37.387 239.327 36.156 238.204 33.586 C 237.263 31.431 237.508 29.348 239.109 27.454 C 239.176 27.375 239.252 27.302 239.328 27.229 C 239.346 27.209 239.377 27.199 239.46 27.155 Z M 240.674 34.191 C 241.438 35.132 243.399 35.803 245.214 35.171 C 247.084 34.52 248.155 32.755 247.759 30.977 C 247.451 29.599 246.086 28.427 244.9 28.272 C 245.647 29.154 245.96 30.123 245.771 31.21 C 245.595 32.231 244.558 33.568 243.832 33.667 C 244.195 32.967 244.402 32.25 244.214 31.469 C 243.623 32.978 242.471 33.899 240.674 34.191 Z" fill="rgb(255,255,255)"/>
               </g>
              </svg>
           </div>
            <div className={styles.description}>
                <p> Domain</p>
            </div>
            <div className={styles.socialmedia}>
                <div ><a href="https://github.com"><img src="/icons/github.png" alt="github" /></a></div>
                <div><a href="https://www.linkedin.com"> <img src="/icons/linkedin.png" alt="linkedin" /></a></div>
                <div><a href="https://www.instagram.com"><img src="/icons/instagram.png" alt="instagram" /></a> </div>
                <div><a href="mailto:xyzu0309@gmail.com"><img src="/icons/email.png" alt="gmail"/></a></div>
               
               
                
            </div>
        </div>
    )
}

export default Profile;