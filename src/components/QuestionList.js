import React from "react";

function QuestionList({ questions, onDelete }) {
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return (
            <li key={question.id}>
              {question.prompt} <button onClick={() => onDelete(question.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
