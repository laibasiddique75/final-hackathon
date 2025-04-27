import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create a new task
  const createTask = async (taskData) => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(taskData),
      });
      const data = await res.json();
      if (res.ok) {
        fetchTasks();
      } else {
        console.error(data.message || 'Failed to create task');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update a task
  const updateTask = async (taskId, updatedData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (res.ok) {
        fetchTasks();
      } else {
        console.error(data.message || 'Failed to update task');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.ok) {
        fetchTasks();
      } else {
        console.error('Failed to delete task');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // For initial fetch
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
