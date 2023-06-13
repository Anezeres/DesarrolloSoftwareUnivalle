import { Formik } from "formik"
import {getLoggedUser, getGroupIdByPerson , postCreateNegotation, postCreateSellService} from "../../api/green_wheels.api"
import {useState, useEffect} from 'react';

export const RequestSellService = () => {

    const [personId, setPersonId] =  useState(null);
    const [clientId, setClientId] =  useState(null);


    const initialValues = {
        'vehicle_plate':'',
        //'client_id':'',
        'negotation_id':'',
        'concessionaire_id':''
    }

    useEffect(()=>{
        async function getCurrentUser(){
            try {
                const responseUser = await getLoggedUser();
                const responseClient = await getGroupIdByPerson(responseUser.data.person_id, 'client');
                const userRequestValidation = responseUser.status >= 200 && responseUser.status <= 299;
                const clientRequestValidation = responseClient.status >= 200 && responseClient.status <= 299;
                if (userRequestValidation && clientRequestValidation)
                {
                    setClientId(responseClient.data.client_id);
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

    async function onSubmit(values, {}) {
        try {
            sellServiceData = {
                'vehicle_plate':values.vehicle_plate,
                'client_id':clientId,
                'negotation_id':values.negotation_id,
                'concessionaire_id':values.concessionaire_id
            }

            const postSellService = await postCreateSellService(sellServiceData);

            if (postSellService.status >= 200 && postSellService.status <= 299) {
                
            } else {
                console.log("Ha ocurrido un error");
            }
            
            
        } catch (error) {
            console.log(error);
        }
        
    }

    return <Formik>
                initialValues={initialValues}
                onSubmit={}
                <Form className='formulario'>
                    
                </Form>
            </Formik>
}