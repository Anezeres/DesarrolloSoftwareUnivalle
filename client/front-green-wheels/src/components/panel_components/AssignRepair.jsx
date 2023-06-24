import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import {useState, useEffect} from 'react';
import { getEmployeesTypeList, postCreateAttendedProcess, getListRepairServices} from '../../api/green_wheels.api';

export const AssignRepair = () => {

    const [workshopbosss, setworkshopbosss] = useState([]);
    const [requests, setRequests] = useState([]);
    const [selectedworkshopboss, setSelectedworkshopboss] = useState("");
    const [selectedRequest, setSelectedRequest] = useState("");


    useEffect(()=>{
        async function requestworkshopbosss(){
            try {
                const responseworkshopbosss = await getEmployeesTypeList(2);

                if (responseworkshopbosss.status >= 200 && responseworkshopbosss.status <= 299) {
                    setworkshopbosss(responseworkshopbosss.data);
                } else {
                    console.log("Ha ocurrido un error");
                }

                const responseRequests = await getListRepairServices();//await getRequestedProcesses();

                if (responseRequests.status >= 200 && responseRequests.status <= 299) {
                    setRequests(responseRequests.data);
                } else {
                    console.log("Ha ocurrido un error");
                }
            } catch (error) {
                console.log(error);
            }
        };
        requestworkshopbosss();
    },
    []);

    const onSelectworkshopboss = (item) => {
        setSelectedworkshopboss(item.employee_id);
    }

    const onSelectRequest = (item) => {
        setSelectedRequest(item.service_id);
    }

    const formatResultworkshopboss = (item) => {
        return (
            <>
              <span style={{ display: 'block', textAlign: 'left' }}> {item.person_id} - {item.names}</span>
            </>
          )
    }

    const formatResultRequest = (item) => {
        return (
            <>
              <span style={{ display: 'block', textAlign: 'left' }}> {item.id}</span>
            </>
          )
    }

    const handlePost = async (values, {resetForm}) => {
        console.log(values)
        try {
            const data = {
                "service_id":values.order_input,
                "employee_id":values.repair_input
            }
            const response = await postCreateAttendedProcess(data);

            if (response.status >= 200 && response.status <= 299){
                console.log("Correcto");
                resetForm();
            } else {
                console.log("Ha ocurrido un error");
            }

        } catch (error) {
            console.log(error);
        }
    }


    return  <>
                <div className = "formulario">
                    <h2>Asignar reparación a jefe de taller</h2>
                    <label htmlFor="negotation_request">Seleccione la reparación</label>
                    <ReactSearchAutocomplete
                        items={requests}
                        onSearch={()=>{}}
                        onHover={()=>{}}
                        onSelect={onSelectRequest}
                        onFocus={()=>{}}
                        autoFocus
                        formatResult={formatResultRequest}
                        fuseOptions={{ keys: ["id"] }}
                        resultStringKeyName="id"
                    />
                    <label htmlFor="workshopboss">Seleccione el jefe de taller</label>
                    <ReactSearchAutocomplete
                        items={workshopbosss}
                        onSearch={()=>{}}
                        onHover={()=>{}}
                        onSelect={onSelectworkshopboss}
                        onFocus={()=>{}}
                        autoFocus
                        formatResult={formatResultworkshopboss}
                        fuseOptions={{ keys: ["person_id", "names"] }}
                        resultStringKeyName="employee_id"
                    />
                </div>
                <div>
                 <Formik initialValues={{"repair_input":selectedworkshopboss,
                 "order_input":selectedRequest}}
                   onSubmit={handlePost} enableReinitialize>
                    <Form className = "formulario">
                        <div key="repair_input">
                        <label htmlFor="repair_input">Jefe de Taller</label>
                        
                        <Field
                        id="repair_input"
                        name="repair_input"
                        placeholder="repair_input"
                        //disabled={true}
                        //value={selectedRequest}
                        />
                        <ErrorMessage name="repair_input" component='div' className='error'/>
                        </div>


                        <div key="order_input">
                        <label htmlFor="order_input">Reparación</label>
                        <Field
                        id="order_input"
                        name="order_input"
                        placeholder="order_input"
                        //disabled={true}
                        //value={selectedworkshopboss}
                        />
                        <ErrorMessage name="order_input" component='div' className='error'/>
                        </div>
                        <button type="submit">SUBMIT</button>
                    </Form>
                </Formik>
                </div>

    </>
}