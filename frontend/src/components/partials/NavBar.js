import {useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import {FaLock, FaSignOutAlt} from 'react-icons/fa'
const NavBar = () => {
    const {logOut, isAuth} = useAuth();
    const navigate = useNavigate();
    const handleDashboard = () =>{
        const adminData =JSON.parse(sessionStorage.getItem('adminData'));
        console.log(adminData.adminType);
        if (adminData.adminType === 'SA') {
            navigate("/adminDB");    
        }else{
            navigate("/superAdminDB");    
        }
    }
    const handleSignOut = ()=>{
        logOut();
        navigate("login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark shadow bg-black fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Lodge a Complaint</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/status">View Status</a>
                            </li>
                            {isAuth ? (
                            <>
                            <li className="nav-item">
                                <div className="nav-link" onClick={handleDashboard}>Admin Dashboard</div>
                            </li>
                            <li className="nav-item">
                                <div className="h3 text-secondary" onClick={handleSignOut}><FaSignOutAlt/></div>
                            </li>
                            </>
                            ) : (<li className="nav-item">
                                <a className="nav-link" href="/login">Admin Login</a>
                            </li>)}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar