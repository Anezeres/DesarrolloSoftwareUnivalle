import { getAssignedNegotations, getGroupIdByPerson, getLoggedUser } from "../../api/green_wheels.api";
import {useState, useEffect} from 'react';


export const CheckNegotations = () => {

    const [negotations, setNegotations] = useState([]);

    useEffect(() => {
        async function requestNegotations () {
            try {
                const responseUser = await getLoggedUser();
                console.log(responseUser)
                if (responseUser.status >= 200 && responseUser.status <= 299)
                {
                    const responseSeller = await getGroupIdByPerson(responseUser.data.user.person_id, 'employee');
                    console.log(responseSeller);
                    if (responseSeller.status >= 200 && responseSeller.status <= 299) {

                        const responseNegotations = await getAssignedNegotations(responseSeller.data.employee_id)
                        console.log(responseNegotations)
                        setNegotations(responseNegotations.data);
                    }

                } else {
                    console.log("Ha ocurrido un error")
                }


            } catch (error) {
                console.log(error)
            }
        }
        requestNegotations();
    },[])

//"employee_id": 1, "attended_date": "2023-06-06", "finished_date": "2023-06-06", "service_id": 2
    return <div>
        <h2>Lista de sus cotizaciones asignadas</h2>
        {negotations.map((e, i) => (<><hr></hr><p key={i}>Employee id: {e.employee_id} -
        Attended date: {e.attended_date} -
        Finished date:{e.finished_date} -
        Service id: {e.service_id}</p>
        <button>Marcar como terminada</button>
        <button>Eliminar Cotizacion</button>
        </>))}
    </div>
}