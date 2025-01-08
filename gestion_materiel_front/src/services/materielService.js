export default class MaterielService{
    static async getMateriels(){
        try {
            const response = await fetch("/api/materiels");
            if (response.ok) {
                const result=await response.json();
                return  result.data;
            } 
            throw new Error("Erreur lors de la récupération du matériels");
            

        } catch (error) {
            console.error("Erreur:", error);
            throw new Error(error.message);
        }
        
    }
}