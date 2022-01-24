import React from "react";

function QuestionList({ questions, onDelete, onSelect }) {
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return (
            <li key={question.id}>
              {question.prompt}
              <label name="answer">Select answer:</label>
              <select name="answer" onChange={(event) => onSelect(question.id, event.target.selectedIndex)}>
                {question.answers.map((answer, index) => {
                  return <option key={answer} selected={index === question.correctIndex}>{answer}</option>
                })}
              </select>
              <button onClick={() => onDelete(question.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
