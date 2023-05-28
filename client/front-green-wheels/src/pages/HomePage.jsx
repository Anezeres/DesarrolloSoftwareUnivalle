import { useEffect, useState} from "react";
import { getLoggedUser, getUserGroups, getAllowedPanels} from "../api/green_wheels.api";


export const HomePage = () => {

    const [isLogged, setIsLogged] = useState(false);
    const [userName, setUserName] = useState('Guest');
    const [userGroups, setUserGroups] = useState([]);
    const [allowedPanels, setAllowedPanels] = useState([]);
    const [logoutLabel, setLogoutLabel] = useState('');


    useEffect(()=>{
        async function getUserRequest () {
            try {
                const res = await getLoggedUser();
                if (res.status === 200)  {
                    setIsLogged(true);
                    setUserName(res.data.user.names);
                    
                    try {
                        const groupsResponse = await getUserGroups(res.data.user.person_id);
                        setUserGroups(groupsResponse.data.groups);
                        const panelsResponse = await getAllowedPanels(res.data.user.person_id);
                        setAllowedPanels(panelsResponse.data.panels);
                    } catch (error) {
                        console.log("The user is not related with any user group...")
                    }
                
                    setLogoutLabel('Logout');
                } else {
                    setLogoutLabel('Logout');
                }
                return 0;
            } catch (error) {
                console.log("User not logged");
                return 0;
            }
        }
        getUserRequest();
    }, []);



    return (<div>
                <h1>Welcome to Green Wheels, {userName}</h1> 
                {!isLogged ? (
                <>
                    <a href="./login">Login</a>
                    <br></br>
                    <a href="./register">Register</a>
                </>) : (<>
                <h2>Your groups are:</h2>
                <ul>
                    {userGroups.map((group, index) => 
                      (<li key={index}>{group}</li>)
                    )} 
                </ul>
                <hr></hr>
                <h2>You have access to the following panels</h2>
                <ul>
                    {allowedPanels.map((panel, index) => 
                      (<li key={index}><a href={"control_panels/"+panel}>{panel}</a></li>)
                    )} 
                </ul>
                <a href="./logout">{logoutLabel}</a>
                </>
                )}
         </div>
    )
}