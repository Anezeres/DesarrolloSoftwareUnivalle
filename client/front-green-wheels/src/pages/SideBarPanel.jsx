import {getAllowedPanels} from "../api/green_wheels.api";
import Sidebar from "./dashboard/scenes/global/Sidebar";
import {useState, useEffect} from 'react';

export const SideBarPanel = ({isSidebar, person_id}) => {

    const [allowedPanels, setAllowedPanels] = useState([]);

    useEffect(()=> {
        async function getPanels () {
            try {
                const response = await getAllowedPanels(person_id);
                if (response.status >= 200 && response.status <= 299){
                    setAllowedPanels(response.data.panels );
                } else {
                    console.log('Permission denied');
                }
            } catch (error) {
                console.log('Permission denied');
            }
        }
        getPanels();
    }, [person_id])


    return <Sidebar isSidebar={isSidebar} panels={allowedPanels}/>
}