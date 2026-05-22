import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const EMPTY = {
  title: '',
  description: '',
  assignee_id: '',
  requester_name: '',
  due_date: '',
  priority: 'medium',
  status: 'todo',
  notes: '',
}

export default function TaskForm({ task, members, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title ?? '',
        description: task.description ?? '',
        assignee_id: task.assignee_id ?? '',
        requester_name: task.requester_name ?? '',
        due_date: task.due_date ?? '',
        priority: task.priority ?? 'medium',
        status: task.status ?? 'todo',
        notes: task.notes ?? '',
      })
    } else {
      setForm(EMPTY)
    }
  }, [task])

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('タスク内容を入力してください')
      return
    }
    setSaving(true)
    setError('')

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      assignee_id: form.assignee_id || null,
      requester_name: form.requester_name.trim() || null,
      due_date: form.due_date || null,
      priority: form.priority,
      status: form.status,
      notes: form.notes.trim() || null,
    }

    const { error: dbError } = task
      ? await supabase.from('tasks').update(payload).eq('id', task.id)
      : await supabase.from('tasks').insert(payload)

    setSaving(false)
    if (dbError) {
      setError('保存に失敗しました。もう一度お試しください。')
      return
    }
    onSave()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2>{task ? 'タスクを編集' : 'タスクを追加'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="閉じる">✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group required">
            <label htmlFor="f-title">タスク内容</label>
            <input
              id="f-title"
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="タスクの内容を入力"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="f-desc">詳細</label>
            <textarea
              id="f-desc"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="詳細な説明（任意）"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="f-assignee">担当者</label>
              <select id="f-assignee" value={form.assignee_id} onChange={e => set('assignee_id', e.target.value)}>
                <option value="">選択してください</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="f-requester">依頼者</label>
              <input
                id="f-requester"
                type="text"
                value={form.requester_name}
                onChange={e => set('requester_name', e.target.value)}
                placeholder="依頼者名を入力"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="f-due">期日</label>
              <input
                id="f-due"
                type="date"
                value={form.due_date}
                onChange={e => set('due_date', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="f-priority">優先度</label>
              <select id="f-priority" value={form.priority} onChange={e => set('priority', e.target.value)}>
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="f-status">ステータス</label>
            <select id="f-status" value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="todo">未着手</option>
              <option value="in_progress">進行中</option>
              <option value="done">完了</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="f-notes">備考</label>
            <textarea
              id="f-notes"
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="備考・メモ（任意）"
              rows={2}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? '保存中...' : '保存する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
