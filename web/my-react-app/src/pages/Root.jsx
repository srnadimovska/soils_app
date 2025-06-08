import { Link, Outlet, useNavigate} from 'react-router-dom';

function Root() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div>
            <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
                {isLoggedIn && (
                    <>
                    <Link to='/' style={{ marginRight: '1rem' }}>Pocetna</Link>
                    <Link to='/pocvi' style={{ marginRight: '1rem' }} >Pocvi</Link>
                    <Link to='/kulturi' style={{ marginRight: '1rem' }} >Zemjodelski kulturi</Link>

                    </>
                )} 
                {!isLoggedIn && (
                    <Link to='/login' style={{ marginRight: '1rem' }}>
                        Najava</Link>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout} style={{ marginRight: '1rem' }}>
                        Odjava</button>
                )}
            </nav>
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </div>
    );
}

export default Root;