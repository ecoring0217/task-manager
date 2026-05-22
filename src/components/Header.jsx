export default function Header({ page, onNavigate }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <svg className="header-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <h1 className="header-title">チームタスク管理</h1>
        </div>
        <nav className="header-nav">
          <button
            className={`nav-btn ${page === 'tasks' ? 'active' : ''}`}
            onClick={() => onNavigate('tasks')}
          >
            タスク一覧
          </button>
          <button
            className={`nav-btn ${page === 'members' ? 'active' : ''}`}
            onClick={() => onNavigate('members')}
          >
            メンバー
          </button>
        </nav>
      </div>
    </header>
  )
}
