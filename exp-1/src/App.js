import React, { useEffect, useState } from "react";
import "./App.css";

const platforms = {
  Twitter: 280,
  Instagram: 2200,
  Facebook: 63206,
  LinkedIn: 3000
};

function App() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load saved drafts
  useEffect(() => {
    const savedDrafts = localStorage.getItem("postDrafts");

    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  // Save drafts to localStorage
  useEffect(() => {
    localStorage.setItem("postDrafts", JSON.stringify(drafts));
  }, [drafts]);

  const handlePlatformChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((item) => item !== platform)
      );
    } else {
      setSelectedPlatforms([
        ...selectedPlatforms,
        platform
      ]);
    }

    setError("");
  };

  const getCharacterLimit = () => {
    if (selectedPlatforms.length === 0) {
      return 0;
    }

    return Math.min(
      ...selectedPlatforms.map(
        (platform) => platforms[platform]
      )
    );
  };

  const characterLimit = getCharacterLimit();

  const handleContentChange = (event) => {
    const value = event.target.value;

    if (
      characterLimit === 0 ||
      value.length <= characterLimit
    ) {
      setContent(value);
      setError("");
    }
  };

  const saveDraft = () => {
    if (!content.trim()) {
      setError("Please enter some post content.");
      return;
    }

    if (selectedPlatforms.length === 0) {
      setError("Please select at least one platform.");
      return;
    }

    if (content.length > characterLimit) {
      setError(
        "Your post exceeds the selected platform limit."
      );
      return;
    }

    const draft = {
      id: editingId || Date.now(),
      content: content,
      platforms: selectedPlatforms,
      date: new Date().toLocaleString()
    };

    if (editingId) {
      setDrafts(
        drafts.map((item) =>
          item.id === editingId ? draft : item
        )
      );

      setEditingId(null);
    } else {
      setDrafts([draft, ...drafts]);
    }

    setContent("");
    setSelectedPlatforms([]);
    setError("");
  };

  const editDraft = (draft) => {
    setContent(draft.content);
    setSelectedPlatforms(draft.platforms);
    setEditingId(draft.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteDraft = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this draft?"
    );

    if (confirmDelete) {
      setDrafts(
        drafts.filter((draft) => draft.id !== id)
      );

      if (editingId === id) {
        setEditingId(null);
        setContent("");
        setSelectedPlatforms([]);
      }
    }
  };

  const clearForm = () => {
    setContent("");
    setSelectedPlatforms([]);
    setError("");
    setEditingId(null);
  };

  return (
    <div className="app">

      <header className="header">
        <h1>Social Media Post Manager</h1>

        <p>
          Create, validate and manage your post drafts
        </p>
      </header>

      <main className="container">

        <section className="composer">

          <h2>
            {editingId
              ? "Edit Draft"
              : "Create New Post"}
          </h2>

          <h3>Select Platforms</h3>

          <div className="platforms">

            {Object.keys(platforms).map(
              (platform) => (
                <label
                  key={platform}
                  className={
                    selectedPlatforms.includes(platform)
                      ? "platform selected"
                      : "platform"
                  }
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(
                      platform
                    )}
                    onChange={() =>
                      handlePlatformChange(platform)
                    }
                  />

                  {platform}
                </label>
              )
            )}

          </div>

          <h3>Post Content</h3>

          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your post here..."
            rows="7"
          />

          <div className="counter">

            <span>
              Characters: {content.length}
            </span>

            <span>
              Limit:{" "}
              {characterLimit || "Select a platform"}
            </span>

          </div>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <div className="buttons">

            <button
              className="save"
              onClick={saveDraft}
            >
              {editingId
                ? "Update Draft"
                : "Save Draft"}
            </button>

            <button
              className="clear"
              onClick={clearForm}
            >
              Clear
            </button>

          </div>

        </section>

        <section className="drafts">

          <h2>Saved Drafts</h2>

          {drafts.length === 0 ? (
            <p className="empty">
              No drafts saved yet.
            </p>
          ) : (

            drafts.map((draft) => (

              <div
                className="draft"
                key={draft.id}
              >

                <div className="draft-top">

                  <strong>
                    {draft.platforms.join(", ")}
                  </strong>

                  <small>
                    {draft.date}
                  </small>

                </div>

                <p>
                  {draft.content}
                </p>

                <div className="draft-buttons">

                  <button
                    onClick={() =>
                      editDraft(draft)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteDraft(draft.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </section>

      </main>

    </div>
  );
}

export default App;