import '../styles/addtask.css'
import React, { useState } from "react";
import TaskList from "./tasklist";

export default function AddTask() {
  const [task, setTask] = useState({
    id: 0,
    description: "",
    completed: false,
  });
  const [taskId, setTaskId] = useState(1);
  const [taskList, setTaskList] = useState([]);

  const handletaskInputChange = (e) => {
    setTask({ ...task, description: e.target.value });
  };

  const handleCheck = (taskId) => {
    const updatedTaskList = taskList.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTaskList(updatedTaskList);
  };

  const handleEdit = (taskId, newDescription) => {
    const updatedTaskList = taskList.map((t) =>
      t.id === taskId ? { ...t, description: newDescription } : t
    );
    setTaskList(updatedTaskList);
  };

  const handleDelete = (taskId) => {
    const updatedTaskList = taskList.filter((t) => t.id !== taskId);
    setTaskList(updatedTaskList);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (task.description.trim() !== "") {
      const newTask = {
        ...task,
        id: taskId,
      };
      const updatedTaskList = [...taskList, newTask];
      setTaskList(updatedTaskList);
      setTaskId(taskId + 1);
      setTask({ ...task, description: "", completed: false });
    }
  };

  const handleCheckAll = () => {
    const areAllTasksChecked = taskList.every((task) => task.completed);
    const updatedTasks = taskList.map((t) => ({
      ...t,
      completed: !areAllTasksChecked,
    }));
    setTaskList(updatedTasks);
  };

  const handleDeleteAll = () => {
    const updatedTasks = taskList.filter((t) => !t.completed);
    setTaskList(updatedTasks);
  };

  return (
    <div>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          placeholder="A year from now you may wish you had started today..."
          value={task.description}
          onChange={handletaskInputChange}
        />
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => setTask({ ...task, completed: !task.completed })}
        />
        <input type="submit" value="Save Task" disabled={!task.description.trim()} />
      </form>
      <div className='buttonCheckDelete'>
      <button onClick={handleCheckAll}><span className='buttontext'>Check All</span></button>
      <button onClick={handleDeleteAll}><span className='buttontext'>Delete All</span></button>
      </div>

      <TaskList
        tasks={taskList}
        handleCheck={handleCheck}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}













