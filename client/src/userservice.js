export async function getAllUsers(offset=0, limit=10){
    try{
        const response = await fetch(`/allusers?offset=${offset}&limit=${limit}`);
        return await response.json();
    }catch(error) {
        console.error(error)
        return [];
    }
}

export async function searchUser(prefix){
    try{
        const response = await fetch(`/search?name=${encodeURIComponent(prefix)}`);
        return await response.json();
    }catch(error) {
        return [];
    }
}

export async function updateQuote(name, quote){
    try{
        const response = await fetch(`/changequote`,
        {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, 
                quote
            })
          });
        return await response.json();
    }catch(error) {
        return [];
    }
}