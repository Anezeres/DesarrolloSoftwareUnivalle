import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import {useState, useEffect} from 'react';
import { getEmployeesTypeList, getRequestedProcesses, postCreateAttendedProcess} from '../../api/green_wheels.api';

export const AssignNegotation = () => {

    const [sellers, setSellers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState("");
    const [selectedRequest, setSelectedRequest] = useState("");


    useEffect(()=>{
        async function requestSellers(){
            try {
                const responseSellers = await getEmployeesTypeList(1);

                if (responseSellers.status >= 200 && responseSellers.status <= 299) {
                    setSellers(responseSellers.data);
                    console.log(sellers)
                } else {
                    console.log("Ha ocurrido un error");
                }

                const responseRequests = await getRequestedProcesses();

                if (responseRequests.status >= 200 && responseRequests.status <= 299) {
                    setRequests(responseRequests.data);
                } else {
                    console.log("Ha ocurrido un error");
                }
            } catch (error) {
                console.log(error);
            }
        };
        requestSellers();
    },
    []);

    const onSelectSeller = (item) => {
        setSelectedSeller(item.employee_id);
    }

    const onSelectRequest = (item) => {
        setSelectedRequest(item.id);
    }

    const formatResultSeller = (item) => {
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
                    <label htmlFor="seller">Seleccione el vendedor</label>
                    <ReactSearchAutocomplete
                        items={sellers}
                        onSearch={()=>{}}
                        onHover={()=>{}}
                        onSelect={onSelectSeller}
                        onFocus={()=>{}}
                        autoFocus
                        formatResult={formatResultSeller}
                        fuseOptions={{ keys: ["person_id", "names"] }}
                        resultStringKeyName="employee_id"
                    />
                </div>
                <div>
                 <Formik initialValues={{"sell_input":selectedSeller,
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
                        //value={selectedSeller}
                        />
                        <ErrorMessage name="negotation_input" component='div' className='error'/>
                        </div>
                        <button type="submit">SUBMIT</button>
                    </Form>
                </Formik>
                </div>

    </>
}