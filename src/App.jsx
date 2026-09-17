import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [priority, setPriority] = useState('normal')
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
      priority: priority,
    },
  ])

  setTask('')
  setPriority('normal')
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
function deleteTask(id) {
  setTasks(tasks.filter((item) => item.id !== id))
}
const filteredTasks = tasks.filter((item) => {
  if (filter === 'completed') {
    return item.completed
  }

  if (filter === 'uncompleted') {
    return !item.completed
  }

  return true
})

const totalTasks = tasks.length

const completedTasks = tasks.filter(
  (item) => item.completed
).length

const completionRate =
  totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100)

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

<select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
>
  <option value="normal">普通</option>
  <option value="important">重要</option>
  <option value="urgent">紧急</option>
</select>

<button onClick={addTask}>
  生成待办
</button>
        </section>

<section className="task-card">
  <h2>我的待办</h2>

  <div className="task-stats">
    <div className="stat-item">
      <strong>{totalTasks}</strong>
      <span>总任务</span>
    </div>

    <div className="stat-item">
      <strong>{completedTasks}</strong>
      <span>已完成</span>
    </div>

    <div className="stat-item">
      <strong>{completionRate}%</strong>
      <span>完成率</span>
    </div>
  </div>

  <div className="filter-buttons">
  <button
    className={filter === 'all' ? 'active' : ''}
    onClick={() => setFilter('all')}
  >
    全部
  </button>

  <button
    className={filter === 'uncompleted' ? 'active' : ''}
    onClick={() => setFilter('uncompleted')}
  >
    未完成
  </button>

  <button
    className={filter === 'completed' ? 'active' : ''}
    onClick={() => setFilter('completed')}
  >
    已完成
  </button>
</div>

  {tasks.length === 0 ? (
            <p className="empty">目前还没有待办事项</p>
          ) : (
            <ul>
  {filteredTasks.map((item) => (
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

<span className={`priority-tag ${item.priority || 'normal'}`}>
  {item.priority === 'urgent'
    ? '紧急'
    : item.priority === 'important'
    ? '重要'
    : '普通'}
</span>
        </label>

        <button
            onClick={() => {
                if (window.confirm("确定要删除这条待办吗？")) {
                    deleteTask(item.id)
                }
            }}
        >
            删除
        </button>
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