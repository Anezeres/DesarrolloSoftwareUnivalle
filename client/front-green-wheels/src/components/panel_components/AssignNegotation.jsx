import { ReactSearchAutocomplete } from 'react-search-autocomplete'
//import { Formik, Form, Field, ErrorMessage} from 'formik'
import {useState, useEffect} from 'react';
import { getEmployeesTypeList } from '../../api/green_wheels.api';

export const AssignNegotation = () => {

    const [sellers, setSellers] = useState([]);
    //const [selectedSeller, setSelectedSeller] = useState("");

    useEffect(()=>{
        async function requestSellers(){
            try {
                const response = await getEmployeesTypeList(1);

                if (response.status >= 200 && response.status <= 299) {
                    //setSellers(response.data);
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
        console.log(item);
        //setSelectedSeller(item.names);
    }


    const formatResultSellers = (item) => {
        return (
            <>
              <span style={{ display: 'block', textAlign: 'left' }}>HOla{/** {item.person_id} - {item.names}*/}</span>
            </>
          )
    }

    return  <>
                <div className = "formulario">
                    <h2>Asignar cotización a vendedor</h2>
                    <label htmlFor="negotation_request">Seleccione la Cotización</label>
                    {/* <ReactSearchAutocomplete
                        id = "negotation_request"
                        items={[1,2,3]}
                        onSearch={()=>{}}
                        onHover={()=>{}}
                        onSelect={null}
                        onFocus={()=>{}}
                        autoFocus
                        formatResult={null}
                        //fuseOptions={{ keys: searchBy }}
                    /> */}
                    <label htmlFor="seller">Seleccione el vendedor</label>
                    <ReactSearchAutocomplete
                        items={[{"data":"abc"}]}
                        onSearch={()=>{}}
                        onHover={()=>{}}
                        onSelect={()=>{}}
                        onFocus={()=>{}}
                        autoFocus
                        formatResult={formatResultSellers}
                        fuseOptions={{ keys: ["data"] }}
                    />
                </div>
                <div>
                {/* <Formik>
                    <Form className = "formulario">
                        <div key="sell_input">
                        <label htmlFor="sell_input">Vendedor</label>
                        <input type="text"
                        id="sell_input"
                        name="sell_input"
                        placeholder="sell_input"
                        disabled={true}
                        value=""></input>
                        <ErrorMessage name="sell_input" component='div' className='error'/>
                        </div>


                        <div key="negotation_input">
                        <label htmlFor="negotation_input">Cotizacion</label>
                        <input type="text"
                        id="negotation_input"
                        name="negotation_input"
                        placeholder="negotation_input"
                        disabled={true}
                        value={selectedSeller}></input>
                        <ErrorMessage name="negotation_input" component='div' className='error'/>
                        </div>

                    </Form>
                </Formik> */}
                </div>

    </>
}