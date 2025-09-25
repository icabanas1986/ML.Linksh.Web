// API base URL
const API_BASE = 'https://linksh.somee.com';

// Check if user is logged in
function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null;
}

// Login function
async function login(email, password) {
    const response = await fetch(`${API_BASE}/user/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    
    if (!response.ok) {
        throw new Error('Credenciales inválidas');
    }
    
    const data = await response.json();
    
    if (data && data.id) {
        // Store user data
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userEmail', email);
        
        // Get and store token
        const tokenResponse = await fetch(`${API_BASE}/user/generandoToken?email=${encodeURIComponent(email)}`);
        if (tokenResponse.ok) {
            const tokenData = await tokenResponse.json();
            localStorage.setItem('token', tokenData.token);
        }
        
        return data;
    } else {
        throw new Error('Error en el inicio de sesión');
    }
}

// Register function
async function register(name, email, password) {
    const response = await fetch(`${API_BASE}/user/register?nombre=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    
    if (!response.ok) {
        throw new Error('Error en el registro');
    }
    
    return await response.json();
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
}