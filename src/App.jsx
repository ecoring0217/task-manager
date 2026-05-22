import { useState, useEffect, useCallback } from 'react'
import { supabase, SECTION } from './lib/supabase'
import Header from './components/Header'
import TaskBoard from './pages/TaskBoard'
import MembersPage from './pages/MembersPage'
import HelpPage from './pages/HelpPage'

export default function App() {
  const [page, setPage] = useState('tasks')
  const [tasks, setTasks] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = useCallback(async () => {
    const { data } = await supabase
      .from('tasks')
      .select(`
        *,
        assignee:assignee_id(id, name),
        requester:requester_id(id, name)
      `)
      .eq('section_name', SECTION)
      .order('created_at', { ascending: false })
    if (data) setTasks(data)
  }, [])

  const fetchMembers = useCallback(async () => {
    const { data } = await supabase
      .from('members')
      .select('*')
      .eq('section_name', SECTION)
      .order('name')
    if (data) setMembers(data)
  }, [])

  useEffect(() => {
    Promise.all([fetchTasks(), fetchMembers()]).then(() => setLoading(false))

    const channel = supabase
      .channel('db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, fetchTasks)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'members' }, fetchMembers)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [fetchTasks, fetchMembers])

  return (
    <div className="app-wrapper">
      <Header page={page} onNavigate={setPage} />
      <main className="app-main">
        {loading ? (
          <div className="loading">読み込み中...</div>
        ) : page === 'tasks' ? (
          <TaskBoard tasks={tasks} members={members} onTaskChange={fetchTasks} />
        ) : page === 'members' ? (
          <MembersPage members={members} onMembersChange={fetchMembers} />
        ) : (
          <HelpPage />
        )}
      </main>
    </div>
  )
}
