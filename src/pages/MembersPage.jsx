import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function MembersPage({ members, onMembersChange }) {
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  async function handleAdd(e) {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    if (members.some(m => m.name === name)) {
      setError('同じ名前のメンバーが既に存在します')
      return
    }
    setAdding(true)
    setError('')
    const { error: dbError } = await supabase.from('members').insert({ name })
    setAdding(false)
    if (dbError) {
      setError('追加に失敗しました')
      return
    }
    setNewName('')
    onMembersChange()
  }

  async function handleDelete(member) {
    if (!confirm(`「${member.name}」を削除しますか？\n担当者・依頼者として設定済みのタスクは「未定」になります。`)) return
    await supabase.from('members').delete().eq('id', member.id)
    onMembersChange()
  }

  return (
    <div className="members-page">
      <div className="page-header">
        <h2>メンバー設定</h2>
        <p className="page-desc">担当者・依頼者として選択できるメンバーを管理します</p>
      </div>

      <div className="members-card">
        <form className="add-member-form" onSubmit={handleAdd}>
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="名前を入力（例：田中 太郎）"
            maxLength={50}
          />
          <button type="submit" className="btn-primary" disabled={adding || !newName.trim()}>
            {adding ? '追加中...' : '追加'}
          </button>
        </form>
        {error && <p className="form-error" style={{ margin: '0 16px 12px' }}>{error}</p>}

        {members.length === 0 ? (
          <p className="empty-text">メンバーがいません。上の欄から追加してください。</p>
        ) : (
          <ul className="members-list">
            {members.map(m => (
              <li key={m.id} className="member-item">
                <span className="member-avatar">{m.name[0]}</span>
                <span className="member-name">{m.name}</span>
                <button
                  className="member-delete"
                  onClick={() => handleDelete(m)}
                  aria-label={`${m.name}を削除`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
