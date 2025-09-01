import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Navber from './components/Navber'
import Home from './pages/Home'
import Food from './pages/Food'
import Fooddetails from './pages/Fooddetails'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Order from './components/Order_Fixed'
import Dashboard from './components/Dashboard'
import AddFood from './components/AddFood'
import ManageFoods from './components/ManageFoods'


function App() {
  return (
     <Router>
      <Navber/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/food' element={<Food/>}/>
        <Route path='/foodDetails/:id' element={<Fooddetails/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/order/:id' element={<Order/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/add-food' element={<AddFood/>}/>
        <Route path='/admin/manage-foods' element={<ManageFoods/>}/>
      </Routes>
      <Footer/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     </Router>
  )
}

export default App
