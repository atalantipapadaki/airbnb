
import { Route, Routes } from 'react-router-dom';
import './App.css'
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
// import RegisterBPage from './pages/RegisterBPage';

import axios from 'axios';
import AccountPage from './pages/AccountPage';
import { UserContextProvider } from './UserContext';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
        </Route>      
      </Routes>
    </UserContextProvider>
  )
}

export default App
