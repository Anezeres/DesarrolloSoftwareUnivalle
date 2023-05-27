import { postLogout } from "../api/green_wheels.api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutPage = () => {

    const Navigate = useNavigate();
    useEffect(()=>{
        async function logout (){
            try {
                const res = await postLogout();
                if (res.status===200) {
                    console.log("Sucessfully Logout");
                } else {
                    console.log("Could not logout");
                }
            } catch (error) {
                console.log("Could not logout");
            }
        }
        logout();
        Navigate('/');
    }, [Navigate]);
}