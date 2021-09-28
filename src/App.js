import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {

  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


//Add Task
// const addTask = (task) => {
//   //console.log(task)
//   const id = Math.floor(Math.random() * 10000) + 1
//   const newTask = {id, ...task}
//   setTasks([...tasks, newTask])
// }


//Adding task to server
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task) //converts Java script object to json string
  })
const data = await res.json()

setTasks([...tasks, data])
}


//Delete Task
// const deleteTask = (id) => {
//   //console.log('delete', id)
//   setTasks(tasks.filter((task) => task.id !==id))
// }

//deleting tasks from server
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })

  //console.log('delete', id)
  setTasks(tasks.filter((task) => task.id !==id))
}

//Toggle Reminder
const toggleReminder = async (id) => {
  const taskToggle = await fetchTask(id)
  const updTask = {...taskToggle, reminder: !taskToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(
    tasks.map((task) => 
    task.id === id ? {...task, reminder: data.reminder} : task
    )
  )
}
  
  return (
    <Router>
    <div className='container'>
     <Header onAdd={() => setShowAddTask (!showAddTask)} showAdd={showAddTask} />
     
    <Route path='/' exact render= {(props) => (
      <> 
      {showAddTask && <AddTask onAdd = {addTask} />}
    {tasks.length > 0 ? (
    <Tasks tasks={tasks} 
    onDelete = {deleteTask} 
    onToggle ={toggleReminder}/> 
    ) : ('No Tasks to Show'
    )}
      </>

    )} />
    <Route path ='/about' component = {About} />
    <Footer />
    </div>  
    </Router>
  )
}


// /*** Functions */
// function App() {
//     const name = 'Brad'
//     const x = false
//   return (
//     <div className="container">
//       <h1>Hello from react </h1>
//   <h2>Hello { x ? 'yes' : 'No'}</h2>
//     </div>
//   );
// }

// /**** classes usage */
// class App extends React.Component {
//   render() {
//     return <h1> Hello from a class</h1>
//   }
// }

export default App;
