import '../styles/tasklist.css';
import React, { useState } from 'react';
import Percent from './persent';

const TaskList = ({ tasks, handleCheck, handleEdit, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [editedDescriptions, setEditedDescriptions] = useState({});
  const [editableTask, setEditableTask] = useState(null);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = tasks.filter((task) =>
      task.description.toLowerCase().includes(term)
    );
    setFilteredTasks(filtered);
  };

  const handleCheckTask = (taskId) => {
    handleCheck(taskId);
  };

  const handleEditTask = (taskId) => {
    if (editableTask === taskId) {
      const editedDescription =
        editedDescriptions[taskId] || tasks.find((task) => task.id === taskId).description;
      handleEdit(taskId, editedDescription);
      setEditableTask(null);
    } else {
      setEditableTask(taskId);
    }
  };

  const handleDeleteTask = (taskId) => {
    handleDelete(taskId);
  };

  const handleEditDescriptionChange = (taskId, description) => {
    setEditedDescriptions({ ...editedDescriptions, [taskId]: description });
  };

  const handleKeyPress = (e, taskId) => {
    if (e.key === 'Enter') {
      handleEditTask(taskId);
    }
  };

  const tasksToDisplay = searchTerm ? filteredTasks : tasks;

  return (
    <div>
      <div className='SearchInput'>
      <input
        type="text"
        placeholder="search ..."
        value={searchTerm}
        onChange={handleSearch}
      />
      </div>

      <Percent tasks={tasks} />
      <div className='taskBoxContainer'>
      {tasksToDisplay.map((task) => (
        <div key={task.id} className='taskBox'>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleCheckTask(task.id)}
          />
          <input
            type="text"
            value={
              editableTask === task.id
                ? editedDescriptions[task.id] !== undefined
                  ? editedDescriptions[task.id]
                  : task.description
                : task.description
            }
            onChange={(e) => handleEditDescriptionChange(task.id, e.target.value)}
            disabled={editableTask !== task.id}
            onKeyPress={(e) => handleKeyPress(e, task.id)}
          />
          <div className='taskButtonEditDelete'>
          <button onClick={() => handleEditTask(task.id)}>
            {editableTask === task.id ? 'Save' : 'Edit'}
          </button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default TaskList;
















