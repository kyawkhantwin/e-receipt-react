import { Route, Routes } from 'react-router-dom'

import IndexPage from '@/pages/index'
import HomePage from '@/feature/home/Home.tsx'
import DetailPage from '@/feature/detail/Detail.tsx'
import AuthRoute from '@/routes/AuthRoutes.tsx'
import ProtectedRoute from '@/routes/ProtectedRoute.tsx'
import ListPage from './feature/list/list'
import ReportPage from './feature/report/report'
import MerchantPage from './feature/merchant/MerchantPage'
import MerchantDetailPage from './feature/merchant-detail/MerchantDetailPage'
import NotFoundPage from './feature/not-found/NotFoundPage'
import CreateUserPage from './feature/user/CreateUserPage'
import UsersPage from './feature/user/UsersPage'

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
        <Route element={<MerchantPage />} path="/merchants" />
        <Route element={<MerchantDetailPage />} path="/merchants/:id" />
        <Route element={<CreateUserPage />} path="/users/create" />
        <Route element={<UsersPage />} path="/users" />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
