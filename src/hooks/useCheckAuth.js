import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";


export const useCheckAuth = () => {
    // const [isAuthChecked, setIsAuthChecked] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        const localAuth = localStorage.getItem('auth');
        if (localAuth) {
            const auth = JSON.parse(localAuth);
            dispatch(userLoggedIn({
                accessToken: auth?.accessToken,
                user: auth?.user
            }))

        }

    }, [dispatch])
    // setIsAuthChecked(true)


    return true;

}
