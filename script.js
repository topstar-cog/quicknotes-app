const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const characterCount = document.querySelector("#character-count");

const notes = [];
noteInput.addEventListener("input", () => {
  characterCount.textContent =
    `${noteInput.value.length} / 200 characters`;
});

function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
    const noteCard = document.createElement("li");
    noteCard.classList.add(
      "note-card",
      `category-${note.category.toLowerCase()}`
    );

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("small");
    categoryLabel.textContent = note.category;

    const dateLabel = document.createElement("small");
    dateLabel.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      const noteIndex = notes.findIndex((item) => item.id === note.id);
      notes.splice(noteIndex, 1);
      render();
    });

    noteCard.append(noteText, categoryLabel, dateLabel, deleteButton);
    notesList.append(noteCard);
  });

  updateNoteCount();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text.length === 0) {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  render();
  noteInput.value = "";
});

render();