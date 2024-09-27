import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
//import { userNavigate } from "react-router-dom";

export default function Register() {

    //const navigate = userNavigate()
    const {setToken} =useContext(AppContext)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:'',
        prenom:'',
        contact: '',
        email: '',
        password : '',
        password_confirmation: ""

    });
 
    const [errors, setErrors] = useState({})

    async function handleRegister(e) {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method : "post",
            body: JSON.stringify(formData),

        });

        const data = await res.json()

        if (data.errors) {
            setErrors(data.errors)      
        }
        else{
          
            localStorage.setItem("token",data.token);
            setToken(data.token);
            
            navigate("/");
            //console.log(data)
        }     
        
    }

    return (
        <>
            <h1 className="title py-4">Register a new account </h1>
        
            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text"  placeholder="Nom" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                    {errors.name && <p className="error">{errors.name[0]}</p>} 

                </div>

                <div>
                    <input type="text"  placeholder="Prenom"
                    value={formData.prenom}
                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}/>
                     {errors.prenom && <p className="error">{errors.prenom[0]}</p>} 
                </div>

                <div>
                    <input type="tel"  placeholder="Contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}/>
                     {errors.contact && <p className="error">{errors.contact[0]}</p>} 
                </div>

                <div>
                    <input type="email"  placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                     {errors.email && <p className="error">{errors.email[0]}</p>} 
                </div>

                <div>
                    <input type="password"  placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                    {errors.password && <p className="error">{errors.password[0]}</p>} 
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.password_confirmation}
                        onChange={(e) =>
                        setFormData({
                            ...formData,
                            password_confirmation: e.target.value,
                        })
                        }
                    />
                </div>

                <button className="primary-btn">Registrer</button>
            </form>
        
        </>
    );
    
}