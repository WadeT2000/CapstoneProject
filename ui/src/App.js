import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginPage from './Login/Login';
import Register from './Login/Register';
import HomePage from './Home/Home';
import Logout from './Login/Logout';
import PatientList from './Patient/PatientList';
import PatientEdit from './Patient/PatientEdit';
import AttendantEdit from './Patient/AttendantEdit';
import AddPatientPage from './Patient/AddPatientPage';
import PatientTable from './Aircraft Loadout/patientTable';
import AircraftList from './Aircraft Builder/AirCraftList';
import AircraftEdit from './Aircraft Builder/AirCraftEdit';
import AircraftCreate from './Aircraft Builder/AirCraftCreate';
import ViewLoadPlan from './Load Plans/LoadPlanView';
import { PrimeReactProvider } from 'primereact/api';
import Load from './Aircraft Loadout/load';
// import StopsInOrder from './Aircraft Loudout/Stops';

//touchscreen dependancies
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DarkModeProvider } from './DarkMode/DarkModeContext'
// import { isTouchDevice } from './utils'; 

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  return(<>
    {location.pathname !== '/' && location.pathname !== '/registration' && (
      <button className="login-button" onClick={() => navigate('/logout')}>Log out</button>
    )}
  </>
  )
}

export const AuthContext = React.createContext();

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setAuth(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}> 
      <PrimeReactProvider>
        <DarkModeProvider>
          <Router>
            <AuthContext.Provider value={{ auth, setAuth }}>
              <Navbar/>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/registration" element={<Register />} />
                  <Route path='/home' element={<HomePage />} />
                  {/* <Route path="/home" element={auth ? <HomePage /> : <Navigate to='/' />} /> */}
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/PatientList" element={<PatientList />} />
                  <Route path="/PatientAddPage" element={<AddPatientPage />} />
                  <Route path="/AttendantEdit/:attendantid" element={<AttendantEdit />} />
                  <Route path='/AircraftList' element={<AircraftList/>}/>
                  <Route path='/AircraftEdit/:aircraftid' element={<AircraftEdit/>}/>
                  <Route path='/AircraftCreate' element={<AircraftCreate/>}/>
                  <Route path="/lp" element={<Load />} />
                  <Route path='/LoadPlanView/:lpId' element={<ViewLoadPlan/>}/>
                  {/* Will Delete */}
                  <Route path='/table' element={<PatientTable />} />
                <Route path="/PatientEdit/:patientid" element={<PatientEdit />} />
                {/* <Route path="/Stops" element={<StopsInOrder />} /> */}
              </Routes>
            </AuthContext.Provider>
          </Router>
        </DarkModeProvider>
      </PrimeReactProvider>
    </DndProvider>
  );
}

export default App;
