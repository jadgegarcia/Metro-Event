import './App.css';

import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  ProtectedRoute
} from 'react-router-dom';
import Appbar from './components/layouts/Appbar';
import SignUp from './components/pages/login_register/SignUp';
import SignIn from './components/pages/login_register/SignIn';
import EventContainer from './components/pages/home/EventContainer';
import DashBoardAppbar from './components/layouts/DashboardAppbar';




const router = createBrowserRouter(
  createRoutesFromElements(
       
        <Route>
            <Route  path="/" element={<Appbar/>}>
                <Route index element={<SignIn/>}/>
                <Route path="register" element={<SignUp/>}/>
                <Route path="events" element={<EventContainer/>}/>

            </Route>
            <Route path='dashboard' element={<DashBoardAppbar  user={user}  />}>
              
            </Route>
        </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
