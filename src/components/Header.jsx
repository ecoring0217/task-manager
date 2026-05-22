import { SECTION } from '../lib/supabase'

const SECTION_LABELS = {
  'honsha-kantei': '本社鑑定',
  'honsha-shuppin': '本社出品',
  'gyomu-kanri': '業務管理',
  'himeji-soko': '姫路倉庫',
  'amagasaki-soko': '尼崎倉庫',
  'kanto-soko': '関東倉庫',
  'zatak': '在宅',
  'default': '',
}

export default function Header({ page, onNavigate }) {
  const sectionLabel = SECTION_LABELS[SECTION] ?? SECTION
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <svg className="header-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <div className="header-titles">
            <h1 className="header-title">チームタスク管理</h1>
            {sectionLabel && (
              <span className="header-section">{sectionLabel}</span>
            )}
          </div>
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
          <button
            className={`nav-btn ${page === 'help' ? 'active' : ''}`}
            onClick={() => onNavigate('help')}
          >
            使い方
          </button>
        </nav>
      </div>
    </header>
  )
}
