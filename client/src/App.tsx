
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

// interface Todo {
//   _id: string; 
//   text: string;
// }

// function App() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.get('http://localhost:3001/api/todos');
//       setTodos(response.data);
//       setIsLoading(false);
//     } catch (err) {
//       setError('Failed to fetch todos');
//       setIsLoading(false);
//     }
//   };

//   const handleAddTodo = async () => {
//     if (!input.trim()) return; 
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.post('http://localhost:3001/api/todos', { text: input });
//       setTodos(todos.concat(response.data)); 
//       setInput('');
//       setIsLoading(false);
//     } catch (err) {
//       setError('Failed to add todo');
//       setIsLoading(false);
//     }
//   };

//   const handleRemoveTodo = async (_id: string) => {
//     setIsLoading(true);
//     setError('');
//     try {
//       await axios.delete(`http://localhost:3001/api/todos/${_id}`);
//       setTodos(todos.filter(todo => todo._id !== _id));
//       setIsLoading(false);
//     } catch (err) {
//       setError('Failed to remove todo');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Todo App with Vite + React</h1>
//       <div className="card">
//         {error && <p className="error">{error}</p>}
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Add new todo"
//             />
//             <button onClick={handleAddTodo}>Add Todo</button>
//             <ul>
//               {todos.map((todo) => (
//                 <li key={todo._id}>
//                   {todo.text}
//                   <button onClick={() => handleRemoveTodo(todo._id)}>Remove</button>
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// export default App;



import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Update the CSS file to include new styles

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3001/api/todos');
      setTodos(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch todos');
      setIsLoading(false);
    }
  };

  const handleAddTodo = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/api/todos', { text: input });
      setTodos([...todos, response.data]);
      setInput('');
      setIsLoading(false);
    } catch (err) {
      setError('Failed to add todo');
      setIsLoading(false);
    }
  };

  const handleRemoveTodo = async (id) => {
    setIsLoading(true);
    setError('');
    try {
      await axios.delete(`http://localhost:3001/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      setIsLoading(false);
    } catch (err) {
      setError('Failed to remove todo');
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>My Tasks</h1>
      </header>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              {todo.text}
              <button onClick={() => handleRemoveTodo(todo._id)} className="remove-btn">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
