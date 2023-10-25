import Create from './Create'
import React, { useEffect, useState } from "react"

function Home(){
    const [todos, setTodos] = useState([])

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
            window.location.reload();
          })
          .catch((err) => console.log(err));
    };

    return (
        <div>
            <h2>To Do List</h2>
            <Create />
            {
                todos.length === 0?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div className='task'>
                        <div onClick={() => handleEdit(todo._id)}>
                            {todo.done ? 
                                <p>Test</p>
                            : <p>X</p>
                            }
                            <p>{todo.task}</p>
                        </div>
                        <div>
                            <span onCLick={() => handleDelete(todo._id)}>X</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home