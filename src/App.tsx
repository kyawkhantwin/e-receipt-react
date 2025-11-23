import { Route, Routes } from 'react-router-dom'

import IndexPage from '@/pages/index'
import HomePage from '@/feature/home/Home.tsx'
import DetailPage from '@/feature/detail/Detail.tsx'
import AuthRoute from '@/routes/AuthRoutes.tsx'
import ProtectedRoute from '@/routes/ProtectedRoute.tsx'
import ListPage from './feature/list/list'
import ReportPage from './feature/report/report'

import ResetPasswordPage from '@/feature/reset-password/ResetPasswordPage'

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route element={<IndexPage />} path="/" />
      </Route>
      <Route element={<ResetPasswordPage />} path="/reset-password" />
      <Route element={<ProtectedRoute />}>
        <Route element={<ListPage />} path="/list" />

        <Route element={<HomePage />} path="/home" />
        <Route element={<HomePage />} path="/home" />
        <Route element={<ReportPage />} path="/report" />
        <Route element={<DetailPage />} path="/detail" />
      </Route>
    </Routes>
  )
}

export default App
