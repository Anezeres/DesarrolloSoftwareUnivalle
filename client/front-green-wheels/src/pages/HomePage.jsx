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



    return (<div className="boxprincipal">
                <h1 className="heading">Welcome to Green Wheels, {userName}</h1>
                {!isLogged ? (
                <>
                    <a className="submit" href="./login">Inicia Sesión</a>
                    <br></br>
                    <a className="submit" href="./register">Registrate</a>
                </>) : (<>
                <h2 className="heading">Your groups are:</h2>
                <ul>
                    {userGroups.map((group, index) =>
                      (<li key={index}>{group}</li>)
                    )}
                </ul>
                <hr></hr>
                <h2 className="heading">You have access to the following panels</h2>
                <ul>
                    {allowedPanels.map((panel, index) =>
                      (<li key={index}><a href={"control_panels/"+panel}>{panel}</a></li>)
                    )}
                </ul>
                <a className="submit" href="./logout">{logoutLabel}</a>
                </>
                )}
         </div>
    )
}