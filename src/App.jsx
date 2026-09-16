import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('classtask_tasks')
  return savedTasks ? JSON.parse(savedTasks) : []
})

useEffect(() => {
  localStorage.setItem('classtask_tasks', JSON.stringify(tasks))
}, [tasks])
function addTask() {
    if (task.trim() === '') return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        content: task,
        completed: false,
      },
    ])

    setTask('')
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  return (
    <div className="app">
      <header>
        <h1>ClassTask</h1>
        <p>班级事务助手</p>
      </header>

      <main>
        <section className="input-card">
          <h2>添加一条事务</h2>

          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="把 QQ 群里的通知粘贴到这里……"
          />

          <button onClick={addTask}>
            生成待办
          </button>
        </section>

        <section className="task-card">
          <h2>我的待办</h2>

          {tasks.length === 0 ? (
            <p className="empty">目前还没有待办事项</p>
          ) : (
            <ul>
              {tasks.map((item) => (
                <li key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleTask(item.id)}
                    />

                    <span className={item.completed ? 'completed' : ''}>
                      {item.content}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App