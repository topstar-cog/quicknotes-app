const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

const notes = [];

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

    noteCard.append(noteText, categoryLabel, dateLabel, deleteButton);
    notesList.append(noteCard);
  });
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  render();
  noteInput.value = "";
});