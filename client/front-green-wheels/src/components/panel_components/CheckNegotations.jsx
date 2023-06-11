import { getNegotations } from "../../api/green_wheels.api";
import {useState, useEffect} from 'react';


export const CheckNegotations = () => {

    const [negotations, setNegotations] = useState([]);

    useEffect(() => {
        async function requestNegotations () {
            try {
                const response = await getNegotations(1);

                if (response.status >= 200 && response.status <= 299) {
                    console.log(response);
                    setNegotations(response.data);
                    console.log("Succesful request");
                } else {
                    console.log("Error while requesting");
                }
            } catch (error) {
                console.log(error)
            }
        }
        requestNegotations();
    },[])

//"employee_id": 1, "attended_date": "2023-06-06", "finished_date": "2023-06-06", "service_id": 2
    return <div>
        {negotations.map((e, i) => (<p key={i}>Employee id: {e.employee_id} -
        Attended date: {e.attended_date} -
        Finished date:{e.finished_date} -
        Service id: {e.service_id}</p> ))}
    </div>
}