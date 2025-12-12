import { useState } from "react";
import styles from "../Pages/Contact.module.css";

const BASE_URL = "https://portfolio-backend-mauve-five.vercel.app";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // 🔥 New state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResponse(data.message);

      if (data.success) {
        setForm({ name: "", email: "", message: "" });
        setSubmitted(true); // show confirmation
      }
    } catch (err) {
      setResponse("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <section className={styles.maincontainer}>
      <div className={styles.recent}>
        <h2 className={styles.head}>LETS WORK</h2>
        <h2 className={styles.pro}>TOGETHER</h2>
      </div>

      <div className={styles.contactSection}>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your@email.com"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading || submitted}
          >
            {loading ? (
              <span className={styles.loader}></span>
            ) : submitted ? (
              "Submitted "
            ) : (
              "Submit"
            )}
          </button>

          {response && (
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>{response}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;