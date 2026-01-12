import styles from './home.module.css';
import TaskForm from './components/task form/taskform';
import { useEffect, useState } from 'react';

const Home = () => {

    // Function that handles show & hide form
    const [showForm, setShowForm] = useState(false);
    const newTask = () => {
        setShowForm(!showForm);
        setError({});
    }

    // Errors
    const [error, setError] = useState({});


    // Function that handles the color of the task based on priority
    const taskPriority = (priority) => {
        if (priority === 'priority1') return '#dd4108';
        if (priority === 'priority2') return '#ffa500';
        if (priority === 'priority3') return '#325aed';
        return '#ffff';
    }


    // Array that stores todos.
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        setTodos(todos)
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);


    // Function that handles task complete
    const taskComplete = (id) => {
        const updatedTodos = todos.map(todo => todo.id === id ? {...todo, completed: true } : todo)
        setTodos(updatedTodos)

        setTimeout(() => {
            const completedTodos = todos.filter( todo => todo.id !== id);
            setTodos(completedTodos);
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
                    <div className={ todo.completed === true ? `${styles.task} ${styles.completed}`: styles.task } key={todo.id} style={{color: taskPriority(todo.priority)}} id={`task-${todo.id}`}>
                        <input type="radio" className={styles.taskComplete} style={{ color: taskPriority(todo.priority)}} onChange={() => taskComplete(todo.id)}/>
                        <p>{todo.task}</p>
                    </div>
                ))}
            </div>
            <TaskForm showForm={showForm} setShowForm={setShowForm} todos={todos} setTodos={setTodos} error={error} setError={setError}/>
            <div className={styles.footerSection}>
                <p>Created by</p>
                <a href="">Maro</a>
            </div>
        </div>
    )
};

export default Home;