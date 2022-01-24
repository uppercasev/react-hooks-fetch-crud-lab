import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (page === "List") {
      fetch("http://localhost:4000/questions")
        .then((r) => r.json())
        .then((data) => {
          setQuestions(data);
        });
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

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onFormSubmit={onFormSubmit} />
      ) : (
        <QuestionList questions={questions} />
      )}
    </main>
  );
}

export default App;
