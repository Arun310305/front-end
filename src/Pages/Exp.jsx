import React from "react";

import styles from "../Pages/Exp.module.css";

function Exp() {
  return (
            <section id="experience" className={styles.maincontainer}>
                 <div className={styles.recent}>
                    <h2>EXPERIENCE</h2>
                    <h2 className={styles.pro}>FRESHER</h2>
                  </div>
                  <div className={styles.expone}>
                    <h3 className={styles.exphead}>Company name </h3>
                      <p className={styles.exppara}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates nobis sint impedit ipsam beatae hic nemo, asperiores cupiditate dolores molestias possimus illo porro temporibus neque!</p>
                      <p className={styles.expnum}>MMM YYYY - MMM YYYY </p>
                
                  </div>
                  <div className={styles.expone}>
                    <h3 className={styles.exphead}>Company name</h3>
                    <p className={styles.exppara}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eum veniam architecto consequatur alias facere. Perferendis ducimus iusto voluptates a optio ex, inventore ratione nihil.</p>
                    <p className={styles.expnum}>MMM YYYY - MMM YYYY</p>
                
                  </div>                                    
            </section>

  )}

  export default Exp;