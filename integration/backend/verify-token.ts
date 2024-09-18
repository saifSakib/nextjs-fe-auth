'use server';
export const verifyToken=async(token:string)=>{
    const res = await fetch('http://localhost:5000/api/user/verify',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token
        }),
      });
  
      const data = await res.json();

      return data
}