import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import RegisterPage from './pages/Register.jsx'
import LoginPage from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import HomePage from './pages/HomePage.jsx'
import HomeLayout from './Layouts/HomeLayout.jsx'
import BookFormModal from './components/Dashboard/BookFormModal.jsx'
import Cart from './components/Dashboard/Cart.jsx'
function App() {
  return (
   <Routes>
    <Route path='/' element={<HomeLayout/>}>
    <Route index element={<HomePage/>}/>
    </Route>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup' element={<RegisterPage/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/dashboard/addbook' element={<BookFormModal/>}/>
    <Route path='/dashboard/cart' element={<Cart/>}/>
   </Routes>
  )
}
export default App
