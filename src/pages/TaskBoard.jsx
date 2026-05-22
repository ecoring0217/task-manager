import { useState, useMemo } from 'react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }
const STATUS_ORDER = { todo: 0, in_progress: 1, done: 2 }

export default function TaskBoard({ tasks, members, onTaskChange }) {
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterAssignee, setFilterAssignee] = useState('all')
  const [hideDone, setHideDone] = useState(false)
  const [search, setSearch] = useState('')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filtered = useMemo(() => {
    return tasks
      .filter(t => {
        if (hideDone && t.status === 'done') return false
        if (filterStatus !== 'all' && t.status !== filterStatus) return false
        if (filterPriority !== 'all' && t.priority !== filterPriority) return false
        if (filterAssignee !== 'all' && t.assignee_id !== filterAssignee) return false
        if (search) {
          const q = search.toLowerCase()
          const inTitle = t.title.toLowerCase().includes(q)
          const inDesc = (t.description ?? '').toLowerCase().includes(q)
          const inNotes = (t.notes ?? '').toLowerCase().includes(q)
          if (!inTitle && !inDesc && !inNotes) return false
        }
        return true
      })
      .sort((a, b) => {
        const aOverdue = a.due_date && a.status !== 'done' && new Date(a.due_date) < today
        const bOverdue = b.due_date && b.status !== 'done' && new Date(b.due_date) < today
        if (aOverdue && !bOverdue) return -1
        if (!aOverdue && bOverdue) return 1

        const sd = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
        if (sd !== 0) return sd

        const pd = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
        if (pd !== 0) return pd

        if (a.due_date && b.due_date) return new Date(a.due_date) - new Date(b.due_date)
        if (a.due_date) return -1
        if (b.due_date) return 1
        return 0
      })
  }, [tasks, filterStatus, filterPriority, filterAssignee, hideDone, search, today])

  function openAdd() {
    setEditingTask(null)
    setShowForm(true)
  }

  function openEdit(task) {
    setEditingTask(task)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingTask(null)
  }

  function handleSaved() {
    closeForm()
    onTaskChange()
  }

  return (
    <div className="task-board">
      <div className="board-toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="タスクを検索..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filter-bar">
          <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">全ステータス</option>
            <option value="todo">未着手</option>
            <option value="in_progress">進行中</option>
            <option value="done">完了</option>
          </select>
          <select className="filter-select" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
            <option value="all">全優先度</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
          <select className="filter-select" value={filterAssignee} onChange={e => setFilterAssignee(e.target.value)}>
            <option value="all">全担当者</option>
            {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={hideDone}
              onChange={e => setHideDone(e.target.checked)}
            />
            完了を非表示
          </label>
          <button className="btn-primary add-btn-desktop" onClick={openAdd}>
            ＋ タスクを追加
          </button>
        </div>
      </div>

      <p className="task-count">{filtered.length} 件のタスク</p>

      <div className="task-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            {tasks.length === 0
              ? 'タスクがまだありません。「＋ タスクを追加」から追加してください。'
              : 'フィルター条件に合うタスクがありません。'}
          </div>
        ) : (
          filtered.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => openEdit(task)}
              onRefresh={onTaskChange}
            />
          ))
        )}
      </div>

      <button className="fab" onClick={openAdd} aria-label="タスクを追加">＋</button>

      {showForm && (
        <TaskForm
          task={editingTask}
          members={members}
          onSave={handleSaved}
          onClose={closeForm}
        />
      )}
    </div>
  )
}
