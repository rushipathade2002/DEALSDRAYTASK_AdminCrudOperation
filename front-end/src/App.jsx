import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { ErrorPage } from './pages/ErrorPage';
import { Logout } from './pages/Logout';
import { AddEmp } from './pages/AddEmp';
import { EditEmp } from './pages/EditEmployee';
import ProtectedRoute from './ProtectedRoute';
import { ForgotPassword } from './pages/ForgotPassword';
import { EmployeeList } from './pages/EmployeeList';
import { Home } from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Home" element={<Home/>} />
          <Route path="/empList" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmp />} />
          <Route path="/edit-emp/:id" element={<EditEmp />} />
          <Route path="/logout " element={<Logout />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
