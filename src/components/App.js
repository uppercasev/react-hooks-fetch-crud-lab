import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
          fetch("http://localhost:4000/questions")
        .then((r) => r.json())
        .then((data) => {
          setQuestions(data);
        });
  }
  
  useEffect(() => {
    if (page === "List") {
      getQuestions();
    }
  }, [page]);

  const onFormSubmit = (input) => {
    const postBody = {
      prompt: input.prompt,
      answers: [input.answer1, input.answer2, input.answer3, input.answer4],
      correctIndex: parseInt(input.correctIndex),
    };
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    }).then(() => setPage("List"));
  };

  const onDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(getQuestions);
  };

  const onSelect = (id, index) => {
    const patchBody = { correctIndex: index }
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patchBody),
    }).then(getQuestions);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onFormSubmit={onFormSubmit} />
      ) : (
        <QuestionList questions={questions} onDelete={onDelete} onSelect={onSelect} />
      )}
    </main>
  );
}

export default App;
