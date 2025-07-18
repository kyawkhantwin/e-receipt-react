import { Route, Routes } from 'react-router-dom'

import IndexPage from '@/pages/index'
import HomePage from '@/feature/home/Home.tsx'
import DetailPage from '@/feature/detail/Detail.tsx'
import AuthRoute from '@/routes/AuthRoutes.tsx'
import ProtectedRoute from '@/routes/ProtectedRoute.tsx'

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route element={<IndexPage />} path="/" />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<HomePage />} path="/home" />
        <Route element={<DetailPage />} path="/detail" />
      </Route>
    </Routes>
  )
}

export default App
