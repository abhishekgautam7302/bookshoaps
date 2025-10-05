import React from "react"
import Navbar from "./component/common/Navbar"
import Footer from "./component/common/Footer"
import { Route, Routes } from "react-router"
import ContactUs from "./pages/ContactUs"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Toaster } from 'react-hot-toast';
import AdminRoutes from "./component/Routes/AdminRoutes"
import PrivateRoute from "./component/Routes/PrivateRoute"
import Dashboard from "./pages/Admin/Dashboard"
import UserDashboard from "./pages/User/UserDashboard"
import AdminRoute from "./component/Routes/AdminRoutes"
import BooksSection from "./pages/User/BooksSection"
import AddBooks from "./pages/User/AddBooks"
import EditBooks from "./pages/User/EditBooks"
import AdminBooksSection from "./pages/Admin/AdminBookSection"
import UpdateBook from "./pages/Admin/UpdateBooks"
import ViewBook from "./pages/User/ViewBook"
import Main from "./pages/Main"




function App() {

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/contact' element={<ContactUs />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />} ></Route>


        <Route element={<PrivateRoute />}>
         <Route path="/dashboard/Student" element={<UserDashboard/>} />
          <Route path="/dashboard/student/books" element={<BooksSection />} />
          <Route path="/dashboard/student/add-books" element={<AddBooks />} />
          <Route path="/dashboard/student/edit-books/:id" element={<EditBooks />} />
          <Route path="/dashboard/student/view-books/:id" element={<ViewBook/>}/>
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/dashboard/teacher" element={<Dashboard/>} />
          <Route path="/dashboard/teacher/books" element={<AdminBooksSection/>} />
          <Route path="/dashboard/teacher/edit-books/:id" element={<UpdateBook/>} />
        </Route>
      </Routes>


      <Footer />
    </>
  )
}

export default App
