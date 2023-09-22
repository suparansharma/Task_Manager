import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ListTasks = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([]);
    const [inprogress, setInprogress] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(() => {
        const fTodos = tasks.filter(task => task.status === "todo")
        const fInprogress = tasks.filter(task => task.status === "inprogress")
        const fDone = tasks.filter(task => task.status === "done")
        setTodos(fTodos);
        setInprogress(fInprogress);
        setDone(fDone);

    }, [tasks]);

    const statuses = ["Todo", "inprogress", "done"]
    return (
        <>
            <div className="flex gap-16">
                {
                    statuses.map((status, index) => (
                        <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inprogress={inprogress} done={done} />
                    ))
                }
            </div>
        </>
    )
}

export default ListTasks


const Section = ({ status, tasks, setTasks, todos, inprogress, done }) => {
    console.log("todos",inprogress);
    let text = "Todo";
    let bg = "bg-slate-500";
    let tasksToMap = todos

    if(status === "inprogress"){
        text = "In Progress";
        bg = "bg-purple-500";
        tasksToMap = inprogress;
    }


    if(status === "done"){
        text = "In Progress";
        bg = "bg-green-500";
        tasksToMap = done;
    }

    return (
        <div className={`w-64`}>


            {/* <h2>{status}</h2> */}
            <Header text={text} bg={bg} count={tasksToMap.length} />
            {
                tasksToMap.length > 0 && 
                tasksToMap.map((task)=>(
                    <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>
                ))
            }
        </div>
    )
}



const Header = ({ text, bg, count }) => {
    return (
        <div>
            <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white `}>
                {text}
                <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
                    {count}
                </div>
            </div>
        </div>
    )
}




const Task = ({task, tasks, setTasks }) => {
    const handleRemove =  (id) =>{
console.log(id);

const fTasks = tasks.filter(t => t.id !== id);

setTasks(fTasks);
toast.success("Successfully Removed")
    }
    return (
        <div className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab`}>
            <p>{task.name}</p>
            <button className="absolute bottom-1 right-1 text-slate-400" 
            onClick={()=>handleRemove(task.id)}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

            </button>
        </div>
    )
}