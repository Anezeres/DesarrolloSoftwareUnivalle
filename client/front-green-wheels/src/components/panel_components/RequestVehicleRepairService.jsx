import { Formik, Form} from "formik"
import {getLoggedUser, getGroupIdByPerson, postCreateRequestRepairVehicle, postCreateRequestSellService} from "../../api/green_wheels.api"
import {useState, useEffect} from 'react';
import { createTextFields } from "../forms/CreateTextFields";

export const RequestVehicleRepairService = () => {
    const [clientId, setClientId] =  useState(null);

    const initialValues = {
        'vehicle_plate':'',
        'workshop_id':''
    }

    useEffect(()=>{
        async function getCurrentUser(){
            try {
                const responseUser = await getLoggedUser();
                const responseClient = await getGroupIdByPerson(responseUser.data.user.person_id, 'client');
                const userRequestValidation = responseUser.status >= 200 && responseUser.status <= 299;
                const clientRequestValidation = responseClient.status >= 200 && responseClient.status <= 299;
                if (userRequestValidation && clientRequestValidation)
                {
                    setClientId(responseClient.data.id);
                } else {
                    console.log("Ha ocurrido un error");
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    },
    [])

    async function onSubmit(values,{resetForm}) {
        try {
            const repairServiceData = {
                'vehicle_plate':values.vehicle_plate,
                'client_id':clientId,
                'workshop_id':values.workshop_id
            }

            const postRepairService = await postCreateRequestRepairVehicle(repairServiceData);

            if (postRepairService.status >= 200 && postRepairService.status <= 299) {
                console.log("Creación Exitosa");
                resetForm();
            } else {
                console.log("Ha ocurrido un error");
            }


        } catch (error) {
            console.log(error);
        }

    }

    return <div>
    <h2>Realizar solicitud de reparación</h2>
    <p>Recuerde que debe estar logueado con una cuenta de tipo cliente para el correcto funcionamiento
        del proceso.
    </p>
    <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    >

            <Form className='formulario'>
                    {createTextFields(['vehicle_plate', 'workshop_id'])}
                    <button type="submit">Submit</button>
            </Form>
    </Formik>
</div>

}