
import { PanelNavbar } from './PanelNavbar';
import { useState, useEffect } from 'react';
import {getLoggedUser} from "../api/green_wheels.api";

export const ControlPanel = ({panel}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [personId, setPersonId] = useState('');

    useEffect(()=> {
        async function getPanels () {
            try {
                const response = await getLoggedUser();
                if (response.status >= 200 && response.status <= 299)  {
                   setPersonId(response.data.user.person_id);
                   setIsLogged(true);
                } else {
                    console.log("User not logged");
                    return 1;
                }
                return 1;
            } catch (error) {
                console.log("User not logged");
                return 1;
            }
        }
        getPanels();
    }, [])

    return (<div>
        {isLogged ? (<>
        <PanelNavbar person_id={personId}/>
        {panel}
        </>) 
        : 
        (<p>Sorry, you need to be logged-in to access this...</p>)}
        
        
    </div>
);
}
