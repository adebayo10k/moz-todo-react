import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name){
    const newTask = {id: "todo-"+nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map( task => {
      if (id === task.id){
        return{...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  //console.log(tasks);
  const taskList = tasks.map(task => (
    <Todo 
    id={task.id}
    name={task.name} 
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}  />
  ));
  //console.log(taskList);

  const taskNoun = taskList.length === 1 ? "task" : "tasks";
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      
      <Form onSubmitCallback={addTask} />

      <div className="filters btn-group stack-exception">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}        

      </ul>
    </div>
  );
}

export default App;
