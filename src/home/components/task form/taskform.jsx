import { useEffect, useRef, useState } from "react";
import styles from "./taskform.module.css";

const TaskForm = ({
  todos,
  setTodos,
  showForm,
  setShowForm,
  error,
  setError,
}) => {
  // Closes form when escape key is clicked
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setShowForm(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setShowForm]);

  // Handles focus to input on mount
  const taskInputRef = useRef(null);
  useEffect(() => {
    if (showForm) {
      taskInputRef.current?.focus();
    }
  }, [showForm]);

  // Todo object and input collection handling
  const [todo, setTodo] = useState({
    id: crypto.randomUUID(),
    task: "",
    priority: "",
    completed: false,
  });

  const handleTodo = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation and error handling
  const validate = () => {
    const newError = {};

    if (todo.task === "") {
      newError.task = "Task cannot be empty";
    }

    return newError;
  };

  // Function that adds todo
  const addTodo = (newTodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];

      if (newTodo.priority === "priority1") {
        // insert at very top
        updatedTodos.unshift(newTodo);
      } else if (newTodo.priority === "priority2") {
        // after all priority1 tasks
        const index = updatedTodos.findIndex(
          (todo) => todo.priority !== "priority1",
        );

        if (index === -1) {
          updatedTodos.push(newTodo);
        } else {
          updatedTodos.splice(index, 0, newTodo);
        }
      } else if (newTodo.priority === "priority3") {
        // after priority1 and priority2
        const index = updatedTodos.findIndex(
          (todo) =>
            todo.priority !== "priority1" && todo.priority !== "priority2",
        );

        if (index === -1) {
          updatedTodos.push(newTodo);
        } else {
          updatedTodos.splice(index, 0, newTodo);
        }
      } else {
        // no priority -> bottom
        updatedTodos.push(newTodo);
      }

      return updatedTodos;
    });
  };

  // Function that handles submission of form
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();

    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      addTodo(todo);
      setShowForm(false);
      setTodo({
        id: Date.now(),
        task: "",
        priority: "",
        completed: false,
      });
      setError({});
    }
  };

  if (!showForm) return null;

  return (
    <div onClick={() => setShowForm(false)} className={styles.backdrop}>
      <div
        className={styles.taskFormContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <form action="" className={styles.addTaskForm}>
          <div className={styles.formInput}>
            <input
              type="text"
              name="task"
              className={styles.taskInput}
              placeholder="Enter new task"
              onChange={handleTodo}
              value={todo.task}
              aria-label="Enter task"
              ref={taskInputRef}
            />
          </div>
          <div className={styles.formActions}>
            <select
              name="priority"
              className={styles.priority}
              onChange={handleTodo}
              value={todo.priority}
              aria-label="Select task priority"
            >
              <option value="">Priority</option>
              <option value="priority1">Urgent</option>
              <option value="priority2">Important</option>
              <option value="priority3">Normal</option>
            </select>
            <button
              type="submit"
              className={styles.addTaskBtn}
              onClick={handleSubmit}
              aria-label="Add task"
            >
              Add
            </button>
          </div>
        </form>
        {error.task && <p className={styles.errMsg}>{error.task}</p>}
      </div>
    </div>
  );
};

export default TaskForm;
