import { getAssignedRepairs, getGroupIdByPerson, getLoggedUser, setFinishedDate} from "../../api/green_wheels.api";
import {useState, useEffect} from 'react';

export const CheckRepairs = () => {

    const [repairs, setRepairs] = useState([]);

    useEffect(() => {
        async function requestRepairs () {
            try {
                const responseUser = await getLoggedUser();
                if (responseUser.status >= 200 && responseUser.status <= 299)
                {

                    const responseWorkshopBoss = await getGroupIdByPerson(responseUser.data.user.person_id, 'employee');
                    if (responseWorkshopBoss.status >= 200 && responseWorkshopBoss.status <= 299) {

                        const responseRepairs = await getAssignedRepairs(responseWorkshopBoss.data.id)
                        console.log(responseRepairs)
                        setRepairs(responseRepairs.data);
                    }

                } else {
                    console.log("Ha ocurrido un error")
                }


            } catch (error) {
                console.log(error)
            }
        }
        requestRepairs();
    },[])


    async function setCurrentDateProcess(id) {
        try {
            const response = await setFinishedDate(id);
            const responseUser = await getLoggedUser();
            if (responseUser.status >= 200 && responseUser.status <= 299)
            {

                if (response.status >= 200 && response.status <= 299) {
                    const responseWorkshopBoss = await getGroupIdByPerson(responseUser.data.user.person_id, 'employee');
                    if (responseWorkshopBoss.status >= 200 && responseWorkshopBoss.status <= 299) {
                        const responseRepairs = await getAssignedRepairs(responseWorkshopBoss.data.id)
                        console.log(responseRepairs)
                        setRepairs(responseRepairs.data);
                    }
                    console.log("Correcto");
                } 
            }   else {
                console.log("Ha ocurrido un error");
            }
        } catch (error) {
            console.log(error);
        }
    }
//"employee_id": 1, "attended_date": "2023-06-06", "finished_date": "2023-06-06", "service_id": 2
    return <><div>
        <h2>Lista de sus cotizaciones asignadas</h2>
        {repairs.map((e, i) => (<div key={i}><hr></hr><p>Employee id: {e.employee_id} -
        Attended date: {e.attended_date} -
        Finished date:{e.finished_date} -
        Service id: {e.service_id}</p>
        <button>Marcar como terminada</button>
        <button onClick={()=>setCurrentDateProcess(e.id)}>Eliminar Reparación</button>
        </div>))}</div>
            
    </>
}