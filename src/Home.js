import Create from './Create'
import React, { useEffect, useState } from "react"
import "./styles/home.css"

function Home(){
    const [todos, setTodos] = useState([])
    const [editingIndex, setEditingIndex] = useState(null)

    const addTask = (tasks) => {
      setTodos([...todos, tasks])
    }

    const handleUpdate = (index) => {
      setEditingIndex(index)
    }

    useEffect(() => {
      // Effectuez une requête GET pour obtenir la liste des tâches
      fetch("http://localhost:3500/get", {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de la requête");
            }
            return response.json();
            })
          .then((data) => {
            setTodos(data)
          })
          .catch((err) => console.log(err));
    }, []);

    const handleEdit = (updatedTask) => {
      // Effectuez une requête PUT pour mettre à jour la tâche
      setEditingIndex(null)
      fetch("http://localhost:3500/update/" + updatedTask.id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Mise à jour réussie:', data);
        })
        .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
      // Effectuez une requête DELETE pour supprimer la tâche
      fetch("http://localhost:3500/delete/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la suppression de la tâche");
          }
          // Rechargez la page après une réponse réussie
          // window.location.reload();
          const todosTabCopy = [...todos]
          const todoCopyUpdated = todosTabCopy.filter((todo) => todo.id !== id)

          setTodos(todoCopyUpdated) 
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className='main_home_div'>
            <h2>To Do List</h2>
            <Create addTask={addTask}/>
            {
                todos.length === 0?
                <div><h2>No Record</h2></div>
                :
                todos.map((todo, index) => (
                    <div className='task' key={index}>
                      {editingIndex === index ? (
                        <div>
                          <input type="text" value={todo.task}  onChange={(e) => {
                            const updatedText = e.target.value;
                            const updatedTodos = [...todos];
                            updatedTodos[index] = { ...todo, task: updatedText };
                            setTodos(updatedTodos);
                          }}/>
                          <button type="button" onClick={() => handleEdit(todos[index])}>Enregistrer</button>
                        </div>
                      ) : (
                        <div className='task_card'>
                            {todo.done ? <p>Test</p> : <p>o</p>}
                            <p>{todo.task}</p>
                          <div className='task_card_btn'>
                              <button type="button" onClick={() => handleDelete(todo.id)}>Delete</button>
                              <button type="button" onClick={() => handleUpdate(index)}>Modify</button>
                          </div>
                        </div>
                      )}
                    </div>
                ))
            }
        </div>
    )
}

export default Home