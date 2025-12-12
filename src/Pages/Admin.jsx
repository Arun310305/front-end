import React, { useState, useEffect } from "react";
import styles from "../Pages/Admin.module.css";

const BASE_URL = "https://portfolio-backend-mauve-five.vercel.app";

function Admin() {
  
  /* ---------------------- STATES ---------------------- */
  const [blog, setBlog] = useState({ title: "", content: "", image: null });
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const [project, setProject] = useState({
    name: "",
    description: "",
    image: null,
    link: ""
  });
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [expandedItems, setExpandedItems] = useState({});
  const [popup, setPopup] = useState({ show: false, type: "", id: null });

  /* ---------------------- FETCH DATA ---------------------- */
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchProjects();
  }, []);

  /* ---------------------- HANDLERS ---------------------- */
  const handleBlogChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const handleProjectChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const handleBlogImage = (e) => {
    setBlog({ ...blog, image: e.target.files[0] });
  };
  const handleProjectImage = (e) => {
    setProject({ ...project, image: e.target.files[0] });
  };

  /* ---------------------- BLOG SUBMIT ---------------------- */
  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    if (blog.image) formData.append("image", blog.image);

    const url = editingBlogId
      ? `${BASE_URL}/api/blogs/${editingBlogId}`
      : `${BASE_URL}/api/blogs`;

    const method = editingBlogId ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("❌ Blog saving failed");

      setBlog({ title: "", content: "", image: null });
      setEditingBlogId(null);
      fetchBlogs();
    } catch (err) {
      alert(err.message);
    }
  };

  /* ---------------------- PROJECT SUBMIT ---------------------- */
  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", project.name);
    formData.append("description", project.description);
    formData.append("link", project.link);
    if (project.image) formData.append("image", project.image);

    const url = editingProjectId
      ? `${BASE_URL}/api/projects/${editingProjectId}`
      : `${BASE_URL}/api/projects`;

    const method = editingProjectId ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("❌ Project saving failed");

      setProject({ name: "", description: "", image: null, link: "" });
      setEditingProjectId(null);
      fetchProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  /* ---------------------- DELETE CONFIRM ---------------------- */
  const handleDelete = async () => {
    try {
      const url =
        popup.type === "blog"
          ? `${BASE_URL}/api/blogs/${popup.id}`
          : `${BASE_URL}/api/projects/${popup.id}`;

      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error("❌ Delete failed");

      popup.type === "blog" ? fetchBlogs() : fetchProjects();

      setPopup({ show: false, type: "", id: null });
    } catch (err) {
      alert(err.message);
    }
  };

  const editBlog = (b) => {
    setBlog({ title: b.title, content: b.content, image: null });
    setEditingBlogId(b._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editProject = (p) => {
    setProject({
      name: p.name,
      description: p.description,
      image: null,
      link: p.link,
    });
    setEditingProjectId(p._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text, id, limit = 100) => {
    if (expandedItems[id]) return text;
    return text.length <= limit ? text : text.slice(0, limit) + "...";
  };

  /* ---------------------- ICONS ---------------------- */
  const EditSVG = (
    <svg className={styles.icon} width="20" height="20" stroke="#f46c38">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );

  const DeleteSVG = (
    <svg className={styles.icon} width="20" height="20" stroke="#dc3545">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );

  /* ---------------------- JSX ---------------------- */
  return (
    <div className={styles.adminContainer}>
      {/* ---------------------- Blog Form ---------------------- */}
      <div className={styles.formSection}>
        <h2>Blogs</h2>
        <form onSubmit={handleBlogSubmit}>
          <input type="text" name="title" value={blog.title} onChange={handleBlogChange} placeholder="Title" required />
          <textarea name="content" value={blog.content} onChange={handleBlogChange} placeholder="Content" required />
          <input type="file" onChange={handleBlogImage} accept="image/*" />
          <button type="submit">{editingBlogId ? "Update Blog" : "Add Blog"}</button>
        </form>

        {/* ---------------------- Project Form ---------------------- */}
        <h2>Projects</h2>
        <form onSubmit={handleProjectSubmit}>
          <input type="text" name="name" value={project.name} onChange={handleProjectChange} placeholder="Project Name" required />
          <textarea name="description" value={project.description} onChange={handleProjectChange} placeholder="Description" required />
          <input type="text" name="link" value={project.link} onChange={handleProjectChange} placeholder="Project Link" />
          <input type="file" onChange={handleProjectImage} accept="image/*" />
          <button type="submit">{editingProjectId ? "Update Project" : "Add Project"}</button>
        </form>
      </div>

      {/* ---------------------- Blog + Project List ---------------------- */}
      <div className={styles.listSection}>
        <h2>Blogs</h2>
        <div className={styles.cardGrid}>
          {blogs.map((b) => (
            <div key={b._id} className={styles.card}>
              {b.image && <img src={b.image} alt={b.title} />}
              <h3>{b.title}</h3>
              <p>{truncateText(b.content, b._id)}</p>

              {b.content.length > 100 && (
                <button onClick={() => toggleExpand(b._id)} className={styles.readMoreBtn}>
                  {expandedItems[b._id] ? "Show Less" : "Read More"}
                </button>
              )}

              <div className={styles.cardActions}>
                <span onClick={() => editBlog(b)}>{EditSVG}</span>
                <span onClick={() => setPopup({ show: true, type: "blog", id: b._id })}>{DeleteSVG}</span>
              </div>
            </div>
          ))}
        </div>

        <h2>Projects</h2>
        <div className={styles.cardGrid}>
          {projects.map((p) => (
            <div key={p._id} className={styles.card}>
              {p.image && <img src={p.image} alt={p.name} />}
              <h3>{p.name}</h3>
              <p>{truncateText(p.description, p._id)}</p>

              {p.description.length > 100 && (
                <button onClick={() => toggleExpand(p._id)} className={styles.readMoreBtn}>
                  {expandedItems[p._id] ? "Show Less" : "Read More"}
                </button>
              )}

              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer">
                  Visit
                </a>
              )}

              <div className={styles.cardActions}>
                <span onClick={() => editProject(p)}>{EditSVG}</span>
                <span onClick={() => setPopup({ show: true, type: "project", id: p._id })}>{DeleteSVG}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------- Delete Popup ---------------------- */}
      {popup.show && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>Are you sure you want to delete this {popup.type}?</p>
            <div className={styles.popupActions}>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setPopup({ show: false, type: "", id: null })}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;