export default class UserService{
    static async getUsers(){
        try {
            const response = await fetch("/api/users");
            if (response.ok) {
                const result=await response.json();
                return  result.data;
            } 
            throw new Error("Erreur lors de la récupération des utilisateurs");
            

        } catch (error) {
            console.error("Erreur:", error);
            throw new Error(error.message);
        }
        
    }
}