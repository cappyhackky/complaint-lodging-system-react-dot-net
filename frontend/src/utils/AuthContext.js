import { useContext, useState, useEffect, createContext } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState('');
    const logIn = (adminData) => {
        setIsAuth(true);
        setUser(adminData)
        sessionStorage.setItem('isAuth', true);
        sessionStorage.setItem('adminData', JSON.stringify(adminData));
    }
    const logOut = () => {
        setIsAuth(false);
        sessionStorage.clear();
    }
    useEffect(() => {
        const storedIsAuth = sessionStorage.getItem('isAuth');
        const adminData = JSON.parse(sessionStorage.getItem('adminData'));
        if (storedIsAuth === 'true') {
            console.log(adminData);
            setIsAuth(true);
            setUser(adminData);
        }
    }, [])
    return (
        <AuthContext.Provider value={{ isAuth, user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};