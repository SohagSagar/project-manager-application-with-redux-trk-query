
import { useSelector } from "react-redux"

const useAuth = () =>{
    const {accessToken,user} =useSelector(state=>state.auth);
    const isLoggedIn =  accessToken && user ? true : false
     return isLoggedIn;
}

export default useAuth;