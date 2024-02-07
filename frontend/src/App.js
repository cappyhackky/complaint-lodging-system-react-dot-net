import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css'
import 'react-loader-spinner/dist/'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import NavBar from './components/partials/NavBar';
import CompStat from './components/CompStat';
import Complaint from './components/Complaint';
import AdminLogin from './components/AdminLogin';
import { AuthProvider } from './utils/AuthContext';
import Footer from './components/partials/Footer';
import error404 from './components/error404';
import AdminDashboard from './components/AdminDashboard';
import ViewComplaint from './components/partials/ViewComplaint';
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
        <NavBar />
          <Routes>
            <Route path='/' Component={Register} />
            <Route path='/status' Component={CompStat} />
            <Route path='/complaint' Component={Complaint} />
            <Route path='/login' Component={AdminLogin} />
            <Route path='/adminDB' Component={AdminDashboard} />
            <Route path='/viewComplaint' Component={ViewComplaint} />
            <Route path='/*' Component={error404} />
          </Routes>
        </Router>
        <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
