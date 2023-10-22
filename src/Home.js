import Create from './Create'
import React, { useEffect, useState } from "react"

function Home(){
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3500/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    handleEdit((id) => {
        axios.put('http://localhost:3500/update/'+id)
        .then(result => {
            location.reload
        })
        .catch(err => console.log(err))
    })

    handleDelete = (id) => {
        axios.delete('http://localhost:3500/delete/'+id)
        .then(result => {
            location.reload
        })
        .catch(err => console.log(err))
    }

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