import { Link, Outlet, useNavigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function getNameFromToken() {
    const token = localStorage.getItem('token');
    if(!token) return null;
    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.name || null;

    } catch {
        return null;
    }
}

function Root() {
    const navigate = useNavigate();
    const name = getNameFromToken();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('token');

    

    return (
        <div className=''>
            <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
                {isLoggedIn && (
                    <>
                    <Link to='/' style={{ marginRight: '1rem' }}>ДОМА</Link>
                    <Link to='/pocvi' style={{ marginRight: '1rem' }} >ПОЧВИ</Link>
                    <Link to='/kulturi' style={{ marginRight: '1rem' }} >ЗЕМЈОДЕЛСКИ КУЛТУРИ</Link>
                    <Link to='/gjubriva' style={{ marginRight: '1rem' }} >ЃУБРИВА</Link>
                    <Link to='/pocva-chat' style={{ marginRight: '1rem' }}>ЗБОРУВАЈ СО НАС</Link>
                    </>
                )} 
                {!isLoggedIn && (
                    <div>
                        
                    <Link to='/login' style={{ marginRight: '1rem' }}>
                        Najava</Link>
                    <Link to='/signup' style={{ marginRight: '1rem' }}>
                        Registracija</Link>
                    
                    </div>
                        
                )}
                {isLoggedIn && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
                    <p style={{color: 'red', margin: 0}}>Гостин:{name}</p>
                    <button onClick={handleLogout} >
                        Odjava</button>
                        
                        </div>
                )}
            </nav>
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </div>
    );
}

export default Root;