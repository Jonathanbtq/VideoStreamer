import React from "react"
import axios from 'axios'

function Create() {
    const [task, setTask] = useState()
    const handleAdd = () => {
        axios.post('http://localhost:3500/add', {task: task})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
    return(
        <div>
            <input type="test" name="" onChange={(e) => setTask(e.target.value)}></input>
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create