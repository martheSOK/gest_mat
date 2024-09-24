import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";


export default function Login() {

   
    const {setToken} =useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        
        email: '',
        password : '',

    });
 
    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method : "post",
            body: JSON.stringify(formData),

        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);     
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
            <h1 className="title py-4">Login to your account </h1>
        
            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="email"  placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                     {errors.email && <p className="error">{errors.email}</p>} 
                </div>

                <div>
                    <input type="password"  placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                    {errors.password && <p className="error">{errors.password}</p>} 
                </div>

                <button className="primary-btn">Login</button>
            </form>
        
        </>
    );
    
}