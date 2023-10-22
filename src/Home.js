import Create from './Create'
import React, { useState } from "react"

function Home(){
    const [todos, setTodos] = useState([])
    return (
        <div>
            <h2>To Do List</h2>
            <Create />
            {
                todos.length === 0?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div>
                        {todo}
                    </div>
                ))
            }
        </div>
    )
}

export default Home