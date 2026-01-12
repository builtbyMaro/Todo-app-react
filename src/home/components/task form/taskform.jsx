import { useState } from 'react';
import styles from './taskform.module.css';

const TaskForm = ({ todos, setTodos, showForm, setShowForm, error, setError}) => {


    // Todo object and input collection handling
    const [todo, setTodo] = useState({
        id: crypto.randomUUID(),
        task: "",
        priority: "",
        completed: false
    });

    const handleTodo = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }

    // Form validation and error handling
    const validate = () => {
        const newError = {};

        if (todo.task === '') {
            newError.task = 'Task cannot be empty'
        }
        
        return newError;
    }

    // Function that adds todo
    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo])
    }

    // Function that handles submission of form
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validate();

        if (Object.keys(validationError).length > 0 ) {
            setError(validationError);
        } else {
            addTodo(todo)
            setShowForm(false);
            setTodo({
                id: Date.now(),
                task: "",
                priority: "",
                completed: false
            })
            setError({});
        }
    }

    return(
        <div className={styles.taskFormContainer} style={{display: showForm === true ? 'flex' : 'none'}}>
            <form action="" className={styles.addTaskForm}>
                <div>
                    <input type="text" name="task" className={styles.taskInput} placeholder="Enter new task" onChange={handleTodo} value={todo.task} aria-label='Enter task'/>
                </div>
                <div className={styles.formActions}>
                    <select name="priority" className={styles.priority} onChange={handleTodo} value={todo.priority} aria-label='Select task priority'>
                        <option value="">Priority</option>
                        <option value="priority1">Priority 1</option>
                        <option value="priority2">Priority 2</option>
                        <option value="priority3">Priority 3</option>
                    </select>
                    <button type="submit" className={styles.addTaskBtn} onClick={handleSubmit} aria-label='Add task'>Add</button>
                </div>
            </form>
            { error.task && <p className={styles.errMsg}>{error.task}</p>}
        </div>
    )
};

export default TaskForm;