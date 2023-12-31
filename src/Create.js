import React, { useState } from "react"

function Create(props) {
    const [task, setTask] = useState("")

    const handleAdd = () => {
        const requestBody = JSON.stringify({ task })
        
        fetch("http://localhost:3500/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la requête");
                }
                console.log(task)
                props.addTask(task)
                setTask("")
                // Rechargez la page après une réponse réussie
                // window.location.reload();
            })
            .catch((err) => console.log(err));
    }
    return(
        <div>
            <input 
            type="test" 
            name="" 
            onChange={(e) => setTask(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create