import './App.css';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import UserPage from './Components/UserPage.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import LoginCard from './Components/Cards/LoginCard.jsx';
import SignupCard from './Components/Cards/SignupCard.jsx';
import SideBar from './Components/SideBar.jsx';
import AllNotes from './Components/SidebarComponents/AllNotes.jsx';
import AddNotes from './Components/SidebarComponents/AddNotes.jsx';
import Pop_upCard from './Components/Cards/Pop_upCard.jsx';
import PricingCard from './Components/Cards/PricingCard.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { NoteContext } from './ContextApi/useContext.jsx';
import AnalyzeTable from './Components/SidebarComponents/AnalyzeTable.jsx';


function LayoutWrapper() {
  const { isauth, setIsAuth, setAuth_Token } = useContext(NoteContext)
  const location = useLocation();
  let navigate = useNavigate()
  const hideLayout = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/sidebar';

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    // console.log(token)
    if (token) {
      setAuth_Token(token)
      setIsAuth(true)
    } else {
      return
    }
  }, [])

  if (hideLayout) {
    setIsAuth(true)
  } else {
    if (!hideLayout && !sessionStorage.getItem('token')) {
      setIsAuth(false)
    } else {

    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {!isauth && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prising' element={<PricingCard />} />
        <Route path='/userpage' element={<UserPage />} />
        <Route path='/login' element={<LoginCard />} />
        <Route path='/signup' element={<SignupCard />} />
        <Route path='/sidebar' element={<SideBar />}>
          <Route path='analyze_table' element={<AnalyzeTable />} />
          <Route path='all-notes' element={<AllNotes />} />
          <Route path='add-note' element={<AddNotes />} />
          <Route path='logout-pop-up' element={<Pop_upCard showModal={true} />} />
        </Route>
      </Routes>
      {!isauth && <Footer />}
    </>
  );
}

function App() {
  return (
    <div>
      <Router>
        <LayoutWrapper />
      </Router>
    </div>
  );
}

export default App;
