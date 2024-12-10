import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout1 from './Pages/Layout1';
//import Home from './Pages/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';

//import Sidebar from './Pages/Sidebar';
import Index from './Pages/TypeMateriel/Index';
import CreateMateriel from './Pages/TypeMateriel/CreateMateriel';
import DetailsMateriel from './Pages/TypeMateriel/DetailsMateriel';
import UpdateMateriel from './Pages/TypeMateriel/UpdateMateriel';
import Create from './Pages/Salles/Create';
import IndexSalle from './Pages/Salles/IndexSalle';
import Details from './Pages/Salles/Details';
import Update from './Pages/Salles/Update';
import IndexComposant from './Pages/composant/IndexComposant';
import CreateComposant from './Pages/composant/CreateComposant';
import DetailComposant from './Pages/composant/DetailComposant';
import UpdateComposant from './Pages/composant/UpdateComposant';
import IndexPost from './Pages/Posts/IndexPost';
import CreatePost from './Pages/Posts/CreatePost';
import DetailPost from './Pages/Posts/DetailPost';
import UpdatePost from './Pages/Posts/UpdatePost';
import AssignUserToPost from './Pages/Posts/AssignUserToPost';
import DetachUserToPost from './Pages/Posts/DetachUserToPost';

import IndexUser from './Pages/Users/IndexUser';
import CreateUser from './Pages/Users/CreateUser';
import UpdatUser from './Pages/Users/UpdateUser';
import DetailUser from './Pages/Users/DetailUser';
import IndexMateriel from './Pages/Materiels/IndexMateriel';
import DetailsMateriel2 from './Pages/Materiels/DetailMateriel2';
import UpdateMateriel2 from './Pages/Materiels/UpdateMateriel2';
import Createmateriel from './Pages/Materiels/Createmateriel';
import AssignMaterielToPost from './Pages/Materiels/AssignMaterielToPost';
import DetachMatrielToPost from './Pages/Materiels/DetachMatrielToPost';
import IndexPret from './Pages/Prets/IndexPret';
import CreatePret from './Pages/Prets/CreatePret';
import DetailPret from './Pages/Prets/DetailPret';
import UpdatePret from './Pages/Prets/UpdatePret';
export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Si l'utilisateur n'est pas connecté, on reste sur la page de connexion */}
        <Route path="/home" element={user ? <Navigate to="/layout" /> : <Login />} />

        {/* Une fois connecté, redirection vers Layout1 */}
        <Route path="/layout" element={user ? <Layout1 /> : <Navigate to="/home" />} />

        {/* Autres routes protégées */}
        <Route path="/register" element={user ? <Layout1 /> : <Register />} />
        <Route path="/type_materiels" element={user ? <Index /> : <Login />} />
        <Route path="/create/type_materiel" element={user ? <CreateMateriel /> : <Login />} />
        <Route path="/type_materiel/show/:id" element={user ? <DetailsMateriel /> : <Login />} />
        <Route path="/type_materiel/update/:id" element={user ? <UpdateMateriel /> : <Login />} />

        <Route path="/salles" element={user ? <IndexSalle /> : <Login />} />
        <Route path="/create/salle" element={user ? <Create /> : <Login />} />
        <Route path="/salle/show/:id" element={user ? <Details /> : <Login />} />
        <Route path="/salle/update/:id" element={user ? <Update /> : <Login />} />

        <Route path="/composants" element={user ? <IndexComposant /> : <Login />} />
        <Route path="/create/composant" element={user ? <CreateComposant /> : <Login />} />
        <Route path="/composant/show/:id" element={user ? <DetailComposant /> : <Login />} />
        <Route path="/composant/update/:id" element={user ? <UpdateComposant /> : <Login />} />

        <Route path="/posts" element={user ? <IndexPost /> : <Login />} />
        <Route path="/create/post" element={user ? <CreatePost /> : <Login />} />
        <Route path="/post/show/:id" element={user ? <DetailPost /> : <Login />} />
        <Route path="/post/update/:id" element={user ? <UpdatePost /> : <Login />} />
        <Route path="/post/assign/:post" element={user ? <AssignUserToPost /> : <Login />} />
        <Route path="/post/detach/:post" element={user ? <DetachUserToPost /> : <Login />} />


        <Route path="/users" element={user ? <IndexUser /> : <Login />} />
        <Route path="/create/users" element={user ? <CreateUser /> : <Login />} />
        <Route path="/users/show/:id" element={user ? <DetailUser /> : <Login />} /> 
        <Route path="/users/update/:id" element={user ? <UpdatUser /> : <Login />} /> 
       
        <Route path="/materiels" element={user ? <IndexMateriel /> : <Login />} />
        <Route path="/create/materiels" element={user ? <Createmateriel /> : <Login />} />
        <Route path="/materiels/show/:id" element={user ? <DetailsMateriel2 /> : <Login />} /> 
        <Route path="/materiels/update/:id" element={user ? <UpdateMateriel2 /> : <Login />} /> 
        <Route path="/materiel/assign/:materiel_id" element={user ? <AssignMaterielToPost /> : <Login />} />
        <Route path="materiel/detach/:materiel_id" element={user ? <DetachMatrielToPost /> : <Login />} />
          

        <Route path="/prets" element={user ? <IndexPret /> : <Login />} />
        <Route path="/pret/create" element={user ? <CreatePret /> : <Login />} />
        <Route path="/pret/show/:pret_id" element={user ? <DetailPret /> : <Login />} /> 
        <Route path="/pret/update/:pret_id" element={user ? <UpdatePret/> : <Login />} /> 

        {/* Route par défaut qui redirige vers /home */}
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}
