import Create from './Create'
import React, { useEffect, useState } from "react"
import "./styles/home.css"

function Home(){
    const [todos, setTodos] = useState([])

    const addTask = (tasks) => {
      setTodos([...todos, tasks])
      console.log(todos)
    }

    useEffect(() => {
        // Effectuez une requête GET pour obtenir la liste des tâches
        fetch("http://localhost:3500/get")
            .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de la requête");
            }
            return response.json();
            })
            .then((data) => setTodos(data))
            .catch((err) => console.log(err));
    }, []);

    const handleEdit = (id) => {
        // Effectuez une requête PUT pour mettre à jour la tâche
        fetch("http://localhost:3500/update/" + id, {
          method: "PUT",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erreur lors de la mise à jour de la tâche");
            }
            // Rechargez la page après une réponse réussie
            window.location.reload();
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
                todos.map(todo => (
                    <div className='task' key={todo.id}>
                        <div onClick={() => handleEdit(todo.id)}>
                            {todo.done ? 
                                <p>Test</p>
                            : <p>o</p>
                            }
                            <p>{todo.task}</p>
                        </div>
                        <div>
                            <button type="button" onClick={() => handleDelete(todo.id)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home