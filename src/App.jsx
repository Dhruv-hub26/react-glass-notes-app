import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

export default function App() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  // ✅ Default notes (knowledge-based)
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "The 2-Minute Rule ⏱️",
      content:
        "If a task takes less than 2 minutes to complete, do it immediately. It’s one of the simplest ways to build momentum and beat procrastination.",
    },
    {
      id: 2,
      title: "Neuroplasticity Tip 🧠",
      content:
        "Your brain rewires based on what you focus on daily. Repetition of positive actions literally changes your neural pathways — start small but stay consistent.",
    },
  ]);

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes"));
    if (saved && saved.length > 0) setNotes(saved);
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !details.trim()) return;
    setNotes([{ id: Date.now(), title, content: details }, ...notes]);
    setTitle("");
    setDetails("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <motion.div
      className="main-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Background */}
      <div className="animated-bg"></div>

      {/* Glass Container */}
      <motion.div
        className="glass-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Add Notes Section */}
        <motion.div
          className="note-input"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <h1 className="heading">Add Your Thoughts ✍️</h1>
          <input
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your ideas, reminders, or reflections..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addNote}
          >
            Save Note
          </motion.button>
        </motion.div>

        {/* Notes Section */}
        <div className="notes-section">
          <h1 className="heading">Your Notes 🧠</h1>
          {notes.length === 0 ? (
            <p className="empty">
              No notes yet — start capturing your thoughts 🪶
            </p>
          ) : (
            <div className="notes-grid">
              <AnimatePresence>
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                    className="note-card"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 25px rgba(0,255,180,0.15)",
                    }}
                  >
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
      >
        <div className="footer-glass">
          <p>
            ✨ Every note starts with a thought — keep writing, keep growing.{" "}
            <br />
            Made with ❤️ & calm energy ☕
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
