import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';

export const AppContext = createContext()
export default function AppProvider({children}){
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);


    async function getUser() {

        const resultat = await fetch('/api/user',{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
       
        const data = await resultat.json();
        if(resultat.ok){
            setUser(data);
        }
        
        //console.log(data);
        
    }
    useEffect(()=>{
        //console.log('Effect ran');
        if (token ) {
            getUser();
        }
        
    }, [token]);

    return(
        <AppContext.Provider value={{ token, setToken , user,setUser}}>
            {children}
        </AppContext.Provider>
    )
}
// Validation des props
AppProvider.propTypes = {
    children: PropTypes.node.isRequired, // Indique que 'children' est requis et peut être de tout type de nœud React
};