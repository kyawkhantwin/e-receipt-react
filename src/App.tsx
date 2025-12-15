import { Route, Routes } from 'react-router-dom'

import ListPage from './feature/list/list'
import ReportPage from './feature/report/report'
import MerchantPage from './feature/merchant/MerchantPage'
import MerchantDetailPage from './feature/merchant-detail/MerchantDetailPage'
import NotFoundPage from './feature/not-found/NotFoundPage'
import UsersPage from './feature/user/UsersPage'

import ProtectedRoute from '@/routes/ProtectedRoute.tsx'
import AuthRoute from '@/routes/AuthRoutes.tsx'
import DetailPage from '@/feature/detail/Detail.tsx'
import HomePage from '@/feature/home/Home.tsx'
import IndexPage from '@/pages/index'
import ResetPasswordPage from '@/feature/reset-password/ResetPasswordPage'
import AdminUsersPage from './feature/user/AdminUserPage'

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
        <Route element={<ReportPage />} path="/report" />
        <Route element={<DetailPage />} path="/detail" />
        <Route element={<MerchantPage />} path="/merchants" />
        <Route element={<MerchantDetailPage />} path="/merchants/:merchantId" />
        <Route element={<AdminUsersPage />} path="/users" />
        <Route element={<UsersPage />} path="/users/:merchantId" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  )
}

export default App
