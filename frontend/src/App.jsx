import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import JobsAdmin from './admin/JobsAdmin';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './admin/Companies';
import CompanyCreate from './admin/CompanyCreate';
import CompanySetup from './admin/CompanySetup';
import PostJob from './admin/PostJob';
import Applicants from './admin/Applicants';
import ProtectedRoute from './admin/ProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },

  /* Admin Routes  */

  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><JobsAdmin /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  }
]);

function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App;
