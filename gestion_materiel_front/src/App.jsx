import { BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import CreateMateriel from './Pages/TypeMateriel/CreateMateriel';
import Index from './Pages/TypeMateriel/Index';
import DetailsMateriel from './Pages/TypeMateriel/DetailsMateriel';

export default function App() {
  const { user } =useContext(AppContext);
  
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>

          <Route path="/register" element={user ?<Home/>:<Register/>}/>
          <Route path="/login" element={user ?<Home/> : <Login/>}/>
         
          <Route path="/type_materiels" element={user ? <Index /> : <Login />} />
          <Route path="/create/type_materiel" element={user ? <CreateMateriel /> : <Login />} />
          <Route path="/type_materiel/show/:id" element={user ? <DetailsMateriel /> : <Login />} />

         {/* <Route path="/type_materiel/show/:id" element={<Show />} />

          <Route path="/type_materiel/update/:id" element={user ? <Update /> : <Login />} /> */}
       
      </Route>

    </Routes>
  </BrowserRouter>
  
}


