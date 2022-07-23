import './App.css'
import HeaderPage from './Pages/HeaderPage'
import PublicRoutes from './Routes/PublicRoutes'
import FooterPage from './Pages/FooterPage'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from './Context/AuthProvider'
// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <HeaderPage />
        <PublicRoutes />
        <FooterPage />
      </AuthProvider>
    </Router>
  )
}
export default App