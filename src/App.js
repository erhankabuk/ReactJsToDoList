import { useState } from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState(readTodos);
  const [title, setTitle] = useState("");
  saveTodos(todos);
  const formSubmitted = function (event) {
    event.preventDefault();

    setTodos(sortTodos([{ title: title, isDone: false }, ...todos]))
    setTitle("");
  };

  const updateDone = function (event, index) {
    const newTodos = [...todos];
    newTodos[index].isDone = event.target.checked;
    setTodos(sortTodos(newTodos));
  }

  const deleteTodo = function (event, index) {
    event.preventDefault();
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

  }



  return (
    <div className="App">
      <h1>My Todos</h1>
      <form onSubmit={formSubmitted}>
        <input value={title} onChange={e => setTitle(e.target.value)}
          type="text" placeholder="What are you going to do?" required />
        <button className='btn-add'>Add</button>
      </form>
      <ul>
        {todos.map((v, i) => <li key={i} className={v.isDone ? "done" : ""} >
          <input type="checkbox" checked={v.isDone} onChange={e => updateDone(e, i)} />
          <span className="title" >{v.title}</span>
          <a href='#' className='delete' onClick={e => deleteTodo(e, i)}><i className='fas fa-times'></i></a>
        </li>)}
      </ul>
    </div>
  );
}

function sortTodos(todos) {
  todos.sort((a, b) => a.isDone - b.isDone);
  return todos;
}


function readTodos() {
  const data = localStorage["data"];
  return data ? JSON.parse(data) : [];
}

function saveTodos(todos) {
  localStorage["data"] = JSON.stringify(todos);

}

export default App;
