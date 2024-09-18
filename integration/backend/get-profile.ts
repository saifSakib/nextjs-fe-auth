export async function getProfile(token:string){
    try {
        const res = await fetch('http://localhost:5000/api/user/profile',{
            method:"GET",
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        return data;
    } catch (error) {
        // console.log(error);
        return 
    }
} 