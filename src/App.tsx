import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Workbench from './pages/user/Workbench'
import Todos from './pages/user/Todos'
import Matters from './pages/user/Matters'
import MatterView from './pages/user/MatterView'
import MemoryCenter from './pages/user/MemoryCenter'
import Abilities from './pages/user/Abilities'
import Connections from './pages/user/Connections'
import Automation from './pages/user/Automation'
import TaskWorkspace from './pages/user/taskworkspace/TaskWorkspace'
import TimelineOntology from './pages/user/TimelineOntology'
import AIExecution from './pages/user/AIExecution'
import AdminOverview from './pages/admin/Overview'
import TaskTrace from './pages/admin/TaskTrace'
import DataMemory from './pages/admin/DataMemory'
import Security from './pages/admin/Security'
import TokenFlow from './pages/admin/TokenFlow'
import SDKAccess from './pages/admin/SDKAccess'
import ExperienceEvolution from './pages/admin/ExperienceEvolution'
import MattersAgents from './pages/admin/MattersAgents'
import Incidents from './pages/admin/Incidents'
import Settings from './pages/admin/Settings'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/workbench" replace />} />
        <Route path="/workbench" element={<Workbench />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/matters" element={<Matters />} />
        <Route path="/matters/:id" element={<MatterView />} />
        <Route path="/memory" element={<MemoryCenter />} />
        <Route path="/abilities" element={<Abilities />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/task/:taskId" element={<TaskWorkspace />} />
        <Route path="/ai-execution/:taskId" element={<AIExecution />} />
        <Route path="/ontology" element={<TimelineOntology />} />
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/task/:taskId" element={<TaskTrace />} />
        <Route path="/admin/matters-agents" element={<MattersAgents />} />
        <Route path="/admin/data-memory" element={<DataMemory />} />
        <Route path="/admin/sdk-access" element={<SDKAccess />} />
        <Route path="/admin/token" element={<TokenFlow />} />
        <Route path="/admin/evolution" element={<ExperienceEvolution />} />
        <Route path="/admin/security" element={<Security />} />
        <Route path="/admin/incidents" element={<Incidents />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
