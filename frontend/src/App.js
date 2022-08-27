import './App.css';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login   from './Pages/user/Login'
import Signup from './Pages/user/Signup'
import Home from './Pages/user/Home'
import Adminlogin from './Pages/admin/adminlogin';
import AdminHome from './Pages/admin/AdminHome';
import Applicationlist from './Component/Admin/ApplicationList';
import Application from './Component/Admin/Applicatioin';
import BookSLot from './Component/Admin/BookSLot';
import ApprovedList from './Component/Admin/ApprovedList';
import DeclinedList from './Component/Admin/DeclinedList';
import ManageUsers from './Component/Admin/ManageUsers';
import Addcompany from './Pages/user/Addcompany';

function App() {
  return (
    <div className='app'>
      
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route  path='/signup' element={<Signup/>} />
          <Route  path='/login' element={<Login/>} />
          <Route  path='/admin' element={<AdminHome/>} >
              <Route  path='applicationlist' element={<Applicationlist/>} />
              <Route  path='application' element={<Application/>} />
              <Route  path='bookSlots' element={<BookSLot/>} />
              <Route  path='approved' element={<ApprovedList/>} />
              <Route  path='declinedlist' element={<DeclinedList/>} />
              <Route  path='manageusers' element={<ManageUsers/>} />
          </Route>
          <Route  path='/add-company' element={<Addcompany/>} />


          
          
          <Route path='/admin/login' element={<Adminlogin/>} />
          

      </Routes>
      </Router>
    </div>
  );
}

export default App;
  