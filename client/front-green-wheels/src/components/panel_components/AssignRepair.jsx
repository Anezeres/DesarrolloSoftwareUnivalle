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
                "service_id":values.negotation_input,
                "employee_id":values.sell_input
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
                    <h2>Asignar cotización a vendedor</h2>
                    <label htmlFor="negotation_request">Seleccione la Cotización</label>
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
                    <label htmlFor="workshopboss">Seleccione el vendedor</label>
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
                 <Formik initialValues={{"sell_input":selectedworkshopboss,
                 "negotation_input":selectedRequest}}
                   onSubmit={handlePost} enableReinitialize>
                    <Form className = "formulario">
                        <div key="sell_input">
                        <label htmlFor="sell_input">Vendedor</label>
                        
                        <Field
                        id="sell_input"
                        name="sell_input"
                        placeholder="sell_input"
                        //disabled={true}
                        //value={selectedRequest}
                        />
                        <ErrorMessage name="sell_input" component='div' className='error'/>
                        </div>


                        <div key="negotation_input">
                        <label htmlFor="negotation_input">Cotizacion</label>
                        <Field
                        id="negotation_input"
                        name="negotation_input"
                        placeholder="negotation_input"
                        //disabled={true}
                        //value={selectedworkshopboss}
                        />
                        <ErrorMessage name="negotation_input" component='div' className='error'/>
                        </div>
                        <button type="submit">SUBMIT</button>
                    </Form>
                </Formik>
                </div>

    </>
}