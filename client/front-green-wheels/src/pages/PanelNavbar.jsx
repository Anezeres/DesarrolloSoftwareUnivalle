import {getAllowedPanels} from "../api/green_wheels.api";
import {useState, useEffect} from 'react';

export const PanelNavbar = ({person_id}) => {
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
    

    return (<div >
        <p><a href="../">HOME</a></p>
        <hr></hr>
        {allowedPanels.map((panel, id)=> <ul className="lista" key={id}><a href={panel}>{panel}</a></ul> )}
    </div>);
}