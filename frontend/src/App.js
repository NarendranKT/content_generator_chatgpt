import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/Users/Register';
import Login from './components/Users/Login';
import Dashboard from './components/Users/Dashboard';
import PublicNavbar from './components/Navbar/PublicNavbar';
import PrivateNavbar from './components/Navbar/PrivateNavbar';
import Home from './components/Home/Home';
import { useAuth } from './AuthContext/AuthContext';
import AuthRoute from './components/AuthRoute/AuthRoute';
import GenerateContent from './components/ContentGeneration/GenerateContent';
import Plan from './components/Plans/Plan';
import Success from './components/Stripe/Success'
import Cancel from './components/Stripe/Cancel'
import ViewHistory from './components/ContentGeneration/ViewHistory';
import HistoryContent from './components/ContentGeneration/HistoryContent';


function App() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Router>
        {
          isAuthenticated? <PrivateNavbar/>:<PublicNavbar/>
        }
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          } />
          <Route path='/generate-content' element={
            <AuthRoute>
              <GenerateContent />
            </AuthRoute>
          } />
          <Route path='/plans' element={<Plan />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/history' element={<ViewHistory />} />
          <Route path='/history/:id' element={<HistoryContent />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
