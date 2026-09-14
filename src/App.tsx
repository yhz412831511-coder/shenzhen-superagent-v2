import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Workbench from './pages/user/Workbench'
import MatterDetail from './pages/user/MatterDetail'
import MeetingPrep from './pages/user/MeetingPrep'
import MeetingRecord from './pages/user/MeetingRecord'
import ResolutionConfirm from './pages/user/ResolutionConfirm'
import TimelineOntology from './pages/user/TimelineOntology'
import AIExecution from './pages/user/AIExecution'
import AdminOverview from './pages/admin/Overview'
import TaskTrace from './pages/admin/TaskTrace'
import DataRisk from './pages/admin/DataRisk'
import DangerBehavior from './pages/admin/DangerBehavior'
import TokenFlow from './pages/admin/TokenFlow'
import ConnectorFactory from './pages/admin/ConnectorFactory'
import SDKCenter from './pages/admin/SDKCenter'
import ExperienceEvolution from './pages/admin/ExperienceEvolution'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/workbench" replace />} />
        <Route path="/workbench" element={<Workbench />} />
        <Route path="/matter/:id" element={<MatterDetail />} />
        <Route path="/meeting-prep/:matterId" element={<MeetingPrep />} />
        <Route path="/meeting-record/:matterId" element={<MeetingRecord />} />
        <Route path="/resolution-confirm/:matterId" element={<ResolutionConfirm />} />
        <Route path="/timeline/:matterId" element={<TimelineOntology />} />
        <Route path="/ai-execution/:taskId" element={<AIExecution />} />
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/task/:taskId" element={<TaskTrace />} />
        <Route path="/admin/data-risk" element={<DataRisk />} />
        <Route path="/admin/danger" element={<DangerBehavior />} />
        <Route path="/admin/token" element={<TokenFlow />} />
        <Route path="/admin/connectors" element={<ConnectorFactory />} />
        <Route path="/admin/sdk" element={<SDKCenter />} />
        <Route path="/admin/evolution" element={<ExperienceEvolution />} />
      </Route>
    </Routes>
  )
}
