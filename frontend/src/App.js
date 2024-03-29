import './App.css';
import { Provider } from 'react-redux';
import{ createStore, combineReducers } from 'redux';
import {authReducer} from './state/reducer';



import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes
} from 'react-router-dom';
import Appbar from './components/layouts/Appbar';
import SignUp from './components/pages/login_register/SignUp';
import SignIn from './components/pages/login_register/SignIn';
import EventContainer from './components/pages/home/EventContainer';
import DashBoardAppbar from './components/layouts/DashboardAppbar';
import EventList from './components/pages/home/EventList';
import IconBreadcrumbs from './components/pages/user/IconBreadcrumbs';


const rootReducer = combineReducers({
  auth: authReducer
})

const store = createStore(rootReducer);

const router = createBrowserRouter(
  createRoutesFromElements(
       
    <Route>
        <Route path="/" element={<Appbar/>}>
          <Route index element={<SignIn/>}/>
          <Route path="register" element={<SignUp/>}/>
          <Route path="event" element={<EventContainer />} />
        </Route>
        <Route path="dashboard" element={<DashBoardAppbar/>}>
<<<<<<< HEAD
          <Route element={<IconBreadcrumbs />}>

            <Route index element={<EventList option={1}/> }/>
            <Route path="my" element={<EventList option={3}/> }/>
            <Route path="joined" element={<EventList option={2}/> }/>
            <Route path="requested"  element={<EventList option={4}/>}/>
            {/* <Route path=  element={}/> */}
            
          </Route>
=======
          <Route index element={<EventContainer />} />
>>>>>>> 07d1d6cade07bdd3f4f6deed6856663621d4f4d4
        </Route>
    </Route>
  
  )
)

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
