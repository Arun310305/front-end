import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Pages/BlogDetails.module.css";

const BASE_URL = "http://localhost:5000"; // 🔥 Change here during deploy

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog details");
        return res.json();
      })
      .then((data) => setBlog(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading blog...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!blog) return <p>No blog found</p>;

  return (
    <div className={styles.blogWrapper}>
      {/* <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button> */}

      <div className={styles.blogContainer}>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.date}>
          {new Date(blog.date || Date.now()).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className={styles.content}>
          {blog.image && (
            <img
              src={blog.image}   // ✅ FIXED LINE (only change made)
              alt={blog.title}
              className={styles.blogImage}
            />
          )}

          {blog.content.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
