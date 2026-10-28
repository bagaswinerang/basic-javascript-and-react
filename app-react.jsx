const MyTaskForm = (props) => {
  const { onSubmit, setTaskTitle, taskTitle } = props;
  return (
    <form class="form" id="taskForm" onSubmit={(event) => onSubmit(event)}>
      <div class="form-group">
        <label for="taskTitle" class="form-label">
          Mau ngapain hari ini?
        </label>

        <input
          class="form-input form-input--full"
          type="text"
          id="taskTitle"
          name="taskTitle"
          placeholder="Masukkan kegiatan Anda..."
          onChange={(event) => setTaskTitle(event.target.value)}
          value={taskTitle}
        />
      </div>
      <div class="form-group form-group--button-right">
        <button type="submit" class="button">
          Simpan
        </button>
      </div>
    </form>
  );
};

const MyTaskList = (props) => {
  const { tasks, checkTask, deleteTask } = props;
  return (
    <div className="tasks">
      <h2 className="tasks-title">Agendaku</h2>
      <ul className="tasks-list" id="tasksList">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li
              key={task.id}
              className={`tasks-list-item ${task.checked ? "checked" : ""}`}
            >
              <div className="task">
                <div>
                  <input
                    type="checkbox"
                    id={`checkTask${index}`}
                    checked={task.checked}
                    onChange={(event) => checkTask(event, index)}
                  />
                </div>
                <div className="task-title">{task.title}</div>
                <button className="button" onClick={() => deleteTask(index)}>
                  Hapus
                </button>
              </div>
            </li>
          ))
        ) : (
          <div className="tasks">
            <div className="tasks-title">Tidak ada kegiatan</div>
          </div>
        )}
      </ul>
    </div>
  );
};

const MyTaskContainer = (props) => {
  const { children } = props;
  return <div className="container">{children}</div>;
};

const App = () => {
  const [taskTitle, setTaskTitle] = React.useState("");
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (event) => {
    event.preventDefault();
    if (taskTitle.trim() === "") {
      alert("Judul tugas tidak boleh kosong!");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const deleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const checkTask = (event, taskIndex) => {
    const isChecked = event.target.checked;
    const updatedTasks = tasks.map((task, index) => {
      if (taskIndex === index) {
        return { ...task, checked: isChecked };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <MyTaskContainer>
      <MyTaskForm
        onSubmit={addTask}
        setTaskTitle={setTaskTitle}
        taskTitle={taskTitle}
      />
      <MyTaskList tasks={tasks} checkTask={checkTask} deleteTask={deleteTask} />
    </MyTaskContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
