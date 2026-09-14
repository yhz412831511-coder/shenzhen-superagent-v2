import { useState, useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
  icon: string
  end?: boolean
}

const userNav: NavItem[] = [
  { to: '/workbench', label: '今日工作', icon: '◐', end: true },
  { to: '/matter/all', label: '事项中心', icon: '◈' },
  { to: '/meeting-prep/MATTER-2026-0912', label: '会议与督办', icon: '≑' },
  { to: '/workbench?tab=pending', label: '等我确认', icon: '✓' },
  { to: '/workbench?tab=memory', label: '工作记忆', icon: '☰' },
  { to: '/workbench?tab=ability', label: '专业能力', icon: '⚙' },
  { to: '/workbench?tab=system', label: '系统连接', icon: '⌘' },
]

const adminNav: NavItem[] = [
  { to: '/admin', label: '运行总览', icon: '◎', end: true },
  { to: '/admin/task/TASK-20260910-0086', label: '单任务全链路', icon: '🔗' },
  { to: '/admin/data-risk', label: '数据风险流向', icon: '⚠' },
  { to: '/admin/danger', label: '危险行为排行', icon: '⚑' },
  { to: '/admin/token', label: 'Token与算力', icon: '₮' },
  { to: '/admin/connectors', label: '连接器工厂', icon: '⌬' },
  { to: '/admin/sdk', label: 'SDK开放', icon: '📦' },
  { to: '/admin/evolution', label: '经验与进化', icon: '↗' },
]

const pageTitles: Record<string, string> = {
  '/workbench': '政务事项工作台',
  '/matter': '事项详情',
  '/meeting-prep': '会前智能准备',
  '/meeting-record': '会议记录与候选对象',
  '/resolution-confirm': '决议确认与督办写回',
  '/timeline': '会议情景时间线与本体关系',
  '/ai-execution': 'AI执行说明与完整回放',
  '/admin': '全市AI运行与进化总览',
  '/admin/task': '单任务全链路',
  '/admin/data-risk': '数据风险流向',
  '/admin/danger': '危险AI行为排行榜',
  '/admin/token': 'Token流向与算力效能',
  '/admin/connectors': '政务连接器工厂与MCP工具',
  '/admin/sdk': 'SuperAgent SDK开放与接入管理',
  '/admin/evolution': '经验池与受控进化',
}

function isItemActive(item: NavItem, pathname: string, search: string): boolean {
  const [itemPath, queryStr] = item.to.split('?')
  const itemTab = queryStr ? queryStr.split('=')[1] : ''
  const currentTab = new URLSearchParams(search).get('tab') || ''

  if (itemTab) {
    return pathname === itemPath && currentTab === itemTab
  }
  if (item.end) {
    return pathname === itemPath && !currentTab
  }
  return pathname.startsWith(itemPath)
}

export default function Layout() {
  const [dark, setDark] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const isAdmin = location.pathname.startsWith('/admin')
  const nav = isAdmin ? adminNav : userNav
  const currentTab = new URLSearchParams(location.search).get('tab') || ''
  const workbenchTabTitles: Record<string, string> = {
    pending: '等我确认',
    memory: '工作记忆',
    ability: '专业能力',
    system: '系统连接',
  }
  const currentTitle = currentTab && !isAdmin
    ? workbenchTabTitles[currentTab] || '政务事项工作台'
    : Object.entries(pageTitles).find(([key]) =>
        location.pathname.startsWith(key)
      )?.[1] || '政务事项工作台'

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-title">政务 SuperAgent</div>
          <div className="sidebar-logo-sub">{isAdmin ? '管理端 · 运行与进化中枢' : '用户端 · 政务事项工作台'}</div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-title">{isAdmin ? '管理端' : '用户端'}</div>
            {nav.map((item) => {
              const active = isItemActive(item, location.pathname, location.search)
              return (
                <a
                  key={item.to}
                  href={`#${item.to}`}
                  className={`sidebar-link ${active ? 'active' : ''}`}
                >
                  <span className="sidebar-link-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              )
            })}
          </div>
          {!isAdmin && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">切换</div>
              <Link to="/admin" className="sidebar-link">
                <span className="sidebar-link-icon">◎</span>
                <span>管理端</span>
              </Link>
            </div>
          )}
          {isAdmin && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">切换</div>
              <Link to="/workbench" className="sidebar-link">
                <span className="sidebar-link-icon">◐</span>
                <span>用户端</span>
              </Link>
            </div>
          )}
        </nav>
        <div className="sidebar-footer">
          演示样例 · V2.0
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <span className="topbar-title">{currentTitle}</span>
            <span className="demo-label">演示样例</span>
          </div>
          <div className="topbar-right">
            <button
              className="topbar-theme-toggle"
              onClick={() => setDark(!dark)}
              title="切换主题"
            >
              {dark ? '☀' : '☾'}
            </button>
            <div className="topbar-user">
              <div className="topbar-avatar">李</div>
              <span>李明 · 政数局</span>
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
