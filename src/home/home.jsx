import styles from './home.module.css';
import TaskForm from './components/task form/taskform';
import { useState } from 'react';

const Home = () => {

    // Function that handles show & hide form
    const [showForm, setShowForm] = useState(false);
    const newTask = () => {
        setShowForm(!showForm);
    }


    // Function that handles the color of the task based on priority
    const taskPriority = (priority) => {
        if (priority === 'priority1') return '#dd4108';
        if (priority === 'priority2') return '#ffa500';
        if (priority === 'priority3') return '#325aed';
        return '#ffff';
    }


    // Array that stores todos. (kept in a state so rerender can happen when user delete's task)
    const [todos, setTodos] = useState(() => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    });


    // Function that handles task complete
    const taskComplete = (id) => {
        const taskDiv = document.getElementById(`task-${id}`);
        if (taskDiv) taskDiv.classList.add(styles.completed);

        setTimeout(() => {
            const updatedTodos = todos.filter( todo => todo.id !== id);
            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }, 500)
    };

    return(
        <div className={styles.homeContainer}>
            <div className={styles.header}>
                <h1>Todo App</h1>
            </div>
            <div className={styles.newTaskBtn} onClick={newTask}>{ showForm === false ? <i className='bx bx-plus'></i> : <i className='bx bx-x'></i>}</div>
            <div className={styles.taskList}>
                {todos.length === 0 ? <p className={styles.noTask} style={{display: showForm === true ? 'none' : 'flex'}}>Click + to add task</p> : todos.map((todo) => (
                    <div className={styles.task} key={todo.id} style={{color: taskPriority(todo.priority)}} id={`task-${todo.id}`}>
                        <input type="radio" className={styles.taskComplete} style={{ color: taskPriority(todo.priority)}} onChange={() => taskComplete(todo.id)}/>
                        <p>{todo.task}</p>
                    </div>
                ))}
            </div>
            <TaskForm showForm={showForm} setShowForm={setShowForm} todos={todos} />
            <div className={styles.footerSection}>
                <p>Created by</p>
                <a href="">Maro</a>
            </div>
        </div>
    )
};

export default Home;