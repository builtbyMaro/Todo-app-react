import { useEffect, useRef, useState } from 'react';
import styles from './taskform.module.css';

const TaskForm = ({ todos, setTodos, showForm, setShowForm, error, setError}) => {

    // Closes form when escape key is clicked
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") setShowForm(false)
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [setShowForm])

    // Handles focus to input on mount
    const taskInputRef = useRef(null);
    useEffect(() => {
        if(showForm) {
            taskInputRef.current?.focus()
        }
    }, [showForm])


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

    if (!showForm) return null;

    return(
        <div onClick={() => setShowForm(false)} className={styles.backdrop}>
        <div className={styles.taskFormContainer} onClick={(e) => e.stopPropagation()}>
            <form action="" className={styles.addTaskForm}>
                <div>
                    <input type="text" name="task" className={styles.taskInput} placeholder="Enter new task" onChange={handleTodo} value={todo.task} aria-label='Enter task' ref={taskInputRef}/>
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
        </div>
    )
};

export default TaskForm;