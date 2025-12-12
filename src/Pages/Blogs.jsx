import React, { useEffect, useState } from "react";
import styles from "../Pages/Blogs.module.css";

const BASE_URL = "https://portfolio-backend-mauve-five.vercel.app";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch(`${BASE_URL}/api/blogs`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.log("Retrying backend wake...");
        setTimeout(loadBlogs, 1500); // Retry if Vercel is waking
        return;
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  const toggleExpand = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id);
  };

  if (loading) return <p className={styles.loading}>Loading blogs...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!blogs.length) return <p className={styles.noBlogs}>No blogs found.</p>;

  return (
    <section id="blogs" className={styles.maincontainer}>
      <div className={styles.recent}>
        <h2 className={styles.head2}>FROM</h2>
        <h2 className={styles.pro}>MY LENS</h2>
      </div>

      <div className={styles.blogcontainer}>
        {blogs.map((blog) => {
          const paragraphs = blog.content.split("\n");

          return (
            <div key={blog._id} className={styles.blogcardWrapper}>
              
              <div
                className={styles.blogcard}
                onClick={() => toggleExpand(blog._id)}
              >
                <div className={styles.blogimg}>
                  <img src={blog.image} alt={blog.title} />
                </div>

                <div className={styles.blogtxt}>
                  <p className={styles.bloghead}>{blog.title}</p>
                  <p className={styles.blogdes}>
                    {blog.content.slice(0, 120)}...
                  </p>
                  <p className={styles.blogdate}>{blog.date}</p>
                </div>
              </div>

              <div
                className={`${styles.dropdown} ${
                  expandedBlogId === blog._id ? styles.showDrop : ""
                }`}
              >
                <img
                  src={blog.image}
                  className={styles.dropImage}
                  alt={blog.title}
                />

                <div className={styles.dropText}>
                  {paragraphs.slice(0, 2).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className={styles.dropTextFull}>
                  {paragraphs.slice(2).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Blogs;