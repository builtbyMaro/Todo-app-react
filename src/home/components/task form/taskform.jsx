import { useState } from 'react';
import styles from './taskform.module.css';

const TaskForm = ({ todos, showForm, setShowForm}) => {

    // States that store the user inputs and functions that get these inputs
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('');
    const newTask = (e) => {
        setTask(e.target.value)
    }
    const newPriority = (e) => {
        setPriority(e.target.value)
    }


    // Class that handles object creation for each task
    class Todo {
        constructor(task, priority, id) {
            this.task = task;
            this.priority = priority;
            this.id = id;
        }
    }

    // Form validation and error handling
    const [error, setError] = useState({});
    const validate = () => {
        const newError = {};

        if (task === '') {
            newError.task = 'Task cannot be empty'
        }
        
        return newError;
    }

    // Function that handles submission of form
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validate();

        if (Object.keys(validationError).length > 0 ) {
            setError(validationError);
        } else {
            const todo = new Todo(task, priority, Date.now());
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));

            setShowForm(false);
            setTask('');
            setPriority('');
            setError({});
        }
    }

    return(
        <div className={styles.taskFormContainer} style={{display: showForm === true ? 'flex' : 'none'}}>
            <form action="" className={styles.addTaskForm}>
                <div>
                    <input type="text" name="task" id={styles.taskInput} placeholder="Enter new task" value={task} onChange={newTask} />
                </div>
                <div className={styles.formActions}>
                    <select name="taskPriority" id={styles.priority} value={priority} onChange={newPriority}>
                        <option value="">Priority</option>
                        <option value="priority1">Priority 1</option>
                        <option value="priority2">Priority 2</option>
                        <option value="priority3">Priority 3</option>
                    </select>
                    <button type="submit" className={styles.addTaskBtn} onClick={handleSubmit}>Add</button>
                </div>
            </form>
            { error.task && <p className={styles.errMsg}>{error.task}</p>}
        </div>
    )
};

export default TaskForm;