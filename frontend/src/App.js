import './App.css';
import { Provider } from 'react-redux';
import{ createStore, combineReducers } from 'redux';
import {authReducer} from './state/reducer';
import {eventReducer} from './state/eventReducer';


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
import RequestOrganizerCard from './components/pages/home/AdminOrganizer/RequestOrganizerCard';
import RequestOrganizerDialog from './components/pages/home/RequestOrganizerDialog';
import EventFormDialog from './components/pages/home/EventFormDialog';


const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer
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
          <Route element={<IconBreadcrumbs />}>

            <Route index element={<EventList/> }/>
            <Route path="my" element={<EventList/> }/>
            <Route path="joined" element={<EventList/> }/>
            <Route path="requested"  element={<EventList/>}/>
            <Route path="admin" element={<EventList/>} />
            <Route path="request-organizer" element={<RequestOrganizerDialog />}/>
            <Route path="create-event" element={<EventFormDialog/>} />
            {/* <Route path=  element={}/> */}
    
          </Route>
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
