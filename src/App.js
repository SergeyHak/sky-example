import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    const getToDo = async () => {
      const data = await (
        await fetch("https://wedev-api.sky.pro/api/todos")
      ).json();
      setTodo(data);
    };
    getToDo();
  }, []);

  const addToDo = async () => {
    const data = await (
      await fetch("https://wedev-api.sky.pro/api/todos", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          text: value,
        }),
      })
    ).json();
    setTodo(data);
    console.log(data)
  };
  const deleteToDo = async (id) => {
    const data = await (
      await fetch (`https://wedev-api.sky.pro/api/todos/${id}`,{
        method:"DELETE",
      })      
       ).json();
       console.log(data)       
       setTodo(data);
      };
      function addNewToDo(params) {
        addToDo();
        setValue('')
      }
  return (
    <div>
      <ol>
        {todo.todos?.map((item) => (
          <div  className="todo-content">
            <li key={item.text}>{item.text}</li>
            <button key={item.id}  onClick={()=>deleteToDo(item.id)}>Удалить задачу</button>
          </div>
        ))}
        <input
          type="text"
          value={value}
          placeholder="Введите знвчение"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button onClick={addNewToDo}>Добавить задачу</button>
      </ol>
    </div>
  );
}

export default App;
