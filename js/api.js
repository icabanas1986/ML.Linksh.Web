// API base URL
const API_BASE = 'https://linksh.somee.com';

// Shorten URL function
async function shortenUrl(originalUrl) {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE}/short/free`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(originalUrl)
    });
    
    if (!response.ok) {
        throw new Error('Error al acortar la URL');
    }
    
    const data = await response.json();
    return `https://linksh.somee.com/${data.shortCode}`;
}

// Get user links
async function getUserLinks(userId) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('No autenticado');
    }
    
    const response = await fetch(`${API_BASE}/list?userId=${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Error al obtener los enlaces');
    }
    
    return await response.json();
}