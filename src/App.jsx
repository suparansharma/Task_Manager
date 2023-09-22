import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask'
import ListTasks from './components/ListTasks'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const[tasks,setTasks]= useState([]);
  useEffect(()=>{
setTasks(JSON.parse(localStorage.getItem("tasks")));
  },[]);
console.log(tasks);
  return (
    <>
    <Toaster />
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-32 gap-16">

      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks}/>
      </div>
    </>
  )
}

export default App
