import { useState } from 'react'
import { supabase } from '../lib/supabase'

const PRIORITY_LABELS = { high: '高', medium: '中', low: '低' }
const STATUS_LABELS = { todo: '未着手', in_progress: '進行中', done: '完了' }
const STATUS_NEXT = { todo: 'in_progress', in_progress: 'done', done: 'todo' }

function formatDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

export default function TaskCard({ task, onEdit, onRefresh }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dueDate = task.due_date ? new Date(task.due_date) : null
  const isOverdue = dueDate && task.status !== 'done' && dueDate < today
  const isDueSoon = dueDate && task.status !== 'done' && !isOverdue &&
    (dueDate - today) / (1000 * 60 * 60 * 24) <= 3

  async function cycleStatus() {
    await supabase
      .from('tasks')
      .update({ status: STATUS_NEXT[task.status] })
      .eq('id', task.id)
    onRefresh()
  }

  async function handleDelete() {
    if (!confirm(`「${task.title}」を削除しますか？`)) return
    setMenuOpen(false)
    await supabase.from('tasks').delete().eq('id', task.id)
    onRefresh()
  }

  return (
    <div className={`task-card${task.status === 'done' ? ' done' : ''}${isOverdue ? ' overdue' : ''}`}>
      <div className="card-header">
        <div className="card-badges">
          <span className={`badge priority-${task.priority}`}>
            優先度：{PRIORITY_LABELS[task.priority]}
          </span>
          <button
            className={`badge status-${task.status} status-btn`}
            onClick={cycleStatus}
            title="クリックでステータスを変更"
          >
            {STATUS_LABELS[task.status]}
          </button>
        </div>
        <div className="card-menu">
          <button
            className="menu-trigger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="メニュー"
          >
            &#8942;
          </button>
          {menuOpen && (
            <>
              <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
              <div className="menu-dropdown">
                <button onClick={() => { setMenuOpen(false); onEdit() }}>編集</button>
                <button className="danger" onClick={handleDelete}>削除</button>
              </div>
            </>
          )}
        </div>
      </div>

      <h3 className="card-title">{task.title}</h3>

      {task.description && (
        <p className="card-description">{task.description}</p>
      )}

      <div className="card-meta">
        <span className="meta-item">
          <span className="meta-label">担当</span>
          <span className="meta-value">{task.assignee?.name ?? '未定'}</span>
        </span>
        <span className="meta-item">
          <span className="meta-label">依頼元</span>
          <span className="meta-value">{task.requester_name ?? '—'}</span>
        </span>
        {dueDate && (
          <span className={`meta-item${isOverdue ? ' overdue-date' : ''}${isDueSoon ? ' soon-date' : ''}`}>
            <span className="meta-label">期日</span>
            <span className="meta-value">
              {isOverdue && '⚠ '}{formatDate(task.due_date)}
            </span>
          </span>
        )}
      </div>

      {task.notes && (
        <div className="card-notes">
          <span className="notes-label">備考：</span>{task.notes}
        </div>
      )}
    </div>
  )
}
