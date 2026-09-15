import { useState, useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
  icon: string
  end?: boolean
  badge?: { text: string; tone?: 'warn' }
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const userNavGroups: NavGroup[] = [
  {
    title: '工作台',
    items: [
      { to: '/workbench', label: '今日工作', icon: '◐', end: true },
      { to: '/todos', label: '待办任务', icon: '✓', badge: { text: '3', tone: 'warn' } },
      { to: '/matters', label: '事项中心', icon: '◈', badge: { text: '27' } },
      { to: '/memory', label: '记忆中心', icon: '☰', end: true },
    ],
  },
  {
    title: '能力中心',
    items: [
      { to: '/abilities', label: '专业能力', icon: '⚙', end: true },
      { to: '/connections', label: '系统连接', icon: '⌘', end: true },
      { to: '/automation', label: '自动化', icon: '⏱', end: true },
    ],
  },
]

interface AdminNavGroup {
  title: string
  items: NavItem[]
}

const adminNavGroups: AdminNavGroup[] = [
  {
    title: '全局运行',
    items: [{ to: '/admin', label: '运行与进化总览', icon: '◎', end: true }],
  },
  {
    title: '能力治理',
    items: [
      { to: '/admin/matters-agents', label: '事项与智能体', icon: '◈' },
      { to: '/admin/data-memory', label: '数据与记忆', icon: '☰' },
      { to: '/admin/sdk-access', label: 'SDK与系统接入', icon: '⌬' },
      { to: '/admin/token', label: 'Token与算力', icon: '₮' },
      { to: '/admin/evolution', label: '经验与进化', icon: '↗' },
    ],
  },
  {
    title: '安全运营',
    items: [
      { to: '/admin/security', label: '安全与审计', icon: '⚑' },
      { to: '/admin/incidents', label: '事件处置', icon: '⚠' },
      { to: '/admin/settings', label: '平台设置', icon: '⚙' },
    ],
  },
]

const pageTitles: Record<string, string> = {
  '/workbench': '今日工作',
  '/todos': '待办任务',
  '/matters': '事项中心',
  '/memory': '记忆中心',
  '/task': '任务工作区',
  '/ai-execution': 'AI执行说明与完整回放',
  '/ontology': '本体关系',
  '/abilities': '专业能力',
  '/connections': '系统连接',
  '/automation': '自动化',
  '/admin': '运行与进化总览',
  '/admin/task': '单任务全链路',
  '/admin/matters-agents': '事项与智能体',
  '/admin/data-memory': '数据与记忆',
  '/admin/sdk-access': 'SDK与系统接入',
  '/admin/token': 'Token与算力',
  '/admin/evolution': '经验与进化',
  '/admin/security': '安全与审计',
  '/admin/incidents': '事件处置',
  '/admin/settings': '平台设置',
}

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.end) {
    return pathname === item.to
  }
  return pathname.startsWith(item.to)
}

export default function Layout() {
  const [dark, setDark] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const isAdmin = location.pathname.startsWith('/admin')
  const currentTitle =
    Object.entries(pageTitles).find(([key]) =>
      location.pathname.startsWith(key)
    )?.[1] || '今日工作'

  const renderItem = (item: NavItem) => {
    const active = isItemActive(item, location.pathname)
    return (
      <a
        key={item.to}
        href={`#${item.to}`}
        className={`sidebar-link ${active ? 'active' : ''}`}
      >
        <span className="sidebar-link-icon">{item.icon}</span>
        <span className="sidebar-link-text">{item.label}</span>
        {item.badge && (
          <span className={`nav-badge ${item.badge.tone === 'warn' ? 'warn' : ''}`}>
            {item.badge.text}
          </span>
        )}
      </a>
    )
  }

  return (
    <div className={`app-layout ${isAdmin ? 'admin-theme' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">政</div>
          <div>
            <div className="sidebar-logo-title">政务 SuperAgent</div>
            <div className="sidebar-logo-sub">SUPERAGENT · AI MEMORY</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {isAdmin ? (
            adminNavGroups.map((group) => (
              <div className="sidebar-section" key={group.title}>
                <div className="sidebar-section-title">{group.title}</div>
                {group.items.map(renderItem)}
              </div>
            ))
          ) : (
            userNavGroups.map((group) => (
              <div className="sidebar-section" key={group.title}>
                <div className="sidebar-section-title">{group.title}</div>
                {group.items.map(renderItem)}
              </div>
            ))
          )}
          {!isAdmin && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">切换</div>
              <Link to="/admin" className="sidebar-link">
                <span className="sidebar-link-icon">◎</span>
                <span className="sidebar-link-text">管理端</span>
              </Link>
            </div>
          )}
          {isAdmin && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">切换</div>
              <Link to="/workbench" className="sidebar-link">
                <span className="sidebar-link-icon">◐</span>
                <span className="sidebar-link-text">用户端</span>
              </Link>
            </div>
          )}
        </nav>
        {isAdmin ? (
          <div className="sidebar-chain">
            <i />
            <span>全市治理链路正常 · 2 活跃 · 2 静默 · 0 离线</span>
          </div>
        ) : (
          <div className="sidebar-health">
            <div className="sidebar-health-label">基于个人AI模型</div>
            <div className="sidebar-health-value">
              使用健康度 <b>72%</b>
            </div>
            <div className="sidebar-health-bar">
              <i />
            </div>
          </div>
        )}
        <div className="sidebar-footer">演示样例 · V2.0</div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <div>
              <div className="topbar-title">
                {isAdmin ? '深圳政务 SuperAgent · 管理端' : '深圳市政务AI工作平台'}
                <span className="demo-label">演示样例</span>
              </div>
              {!isAdmin && (
                <div className="topbar-subtitle">统一身份、组织权限已生效</div>
              )}
            </div>
          </div>
          <div className="topbar-right">
            <span className="topbar-status">
              <i />
              {isAdmin ? '安全运行正常' : '安全运行正常'}
            </span>
            <button className="topbar-icon-btn" title="帮助">
              ?
            </button>
            <button className="topbar-icon-btn" title="通知">
              ∏
              <span className="dot" />
            </button>
            <button
              className="topbar-theme-toggle"
              onClick={() => setDark(!dark)}
              title="切换主题"
            >
              {dark ? '☀' : '☾'}
            </button>
            <div className="topbar-user">
              <div className="topbar-avatar">{isAdmin ? '管' : '陈'}</div>
              <span>{isAdmin ? '运行管理员' : '陈静 · 政数局办公室'}</span>
            </div>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
