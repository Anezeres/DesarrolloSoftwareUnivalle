import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import {useState, useEffect} from 'react';
import { getReplacementsParts, getDiagnosis, postCreateNeededReplacementPart} from '../../api/green_wheels.api';
//import { getEmployeesTypeList, postCreateAttendedProcess, getListSellServices} from '../../api/green_wheels.api';

export const AssignReplacementPart = () => {

    const [replacements, setReplacements] = useState([]);
    const [diagnosis, setDiagnosis] = useState([]);
    const [selectedReplacement, setSelectedReplacement] = useState("");
    const [selectedDiagnosis, setSelectedDiagnosis] = useState("");


    useEffect(()=>{
        async function requestFunction(){
            try {
                const responseReplacements= await getReplacementsParts();

                if (responseReplacements.status >= 200 && responseReplacements.status <= 299) {
                    setReplacements(responseReplacements.data);
                } else {
                    console.log("Ha ocurrido un error");
                }

                const responseDiagnosis = await getDiagnosis();//await getRequestedProcesses();

                if (responseDiagnosis.status >= 200 && responseDiagnosis.status <= 299) {
                    setDiagnosis(responseDiagnosis.data);
                } else {
                    console.log("Ha ocurrido un error");
                }
            } catch (error) {
                console.log(error);
            }
        };
        requestFunction();
    },
    []);

    const onSelectReplacement = (item) => {
        setSelectedReplacement(item.id);
    }

    const onSelectDiagnosis = (item) => {
        setSelectedDiagnosis(item.id);
    }

    const formatResultReplacement = (item) => {
        return (
            <>
              <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
          )
    }

    const formatResultDiagnosis = (item) => {
        return (
            <>
              <span style={{ display: 'block', textAlign: 'left' }}>{item.description}</span>
            </>
          )
    }

    const handlePost = async (values, {resetForm}) => {
        try {
            const data = {
                "replacement_id":values.replacements_input,
                "diagnosis_id":values.diagnosis_input,
            };

            const response = await postCreateNeededReplacementPart(data);

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
                    <h2>Asignar parte de repuesto a diagnosis</h2>
                    <label htmlFor="replacements_input">Seleccione la parte de repuesto</label>
                    <ReactSearchAutocomplete
                        items={replacements}
                        onSearch={()=>{}}
                        onHover={()=>{}}
                        onSelect={onSelectReplacement}
                        onFocus={()=>{}}
                        autoFocus
                        formatResult={formatResultReplacement}
                        fuseOptions={{ keys: ["id"] }}
                        resultStringKeyName="id"
                    />
                    <label htmlFor="diagnosis_input">Seleccione el diagnostico</label>
                    <ReactSearchAutocomplete
                        items={diagnosis}
                        onSearch={()=>{}}
                        onHover={()=>{}}
                        onSelect={onSelectDiagnosis}
                        onFocus={()=>{}}
                        autoFocus
                        formatResult={formatResultDiagnosis}
                        fuseOptions={{ keys: ["id"] }}
                        resultStringKeyName="id"
                    />
                </div>
                <div>
                 <Formik initialValues={{"replacements_input":selectedReplacement,
                 "diagnosis_input":selectedDiagnosis}}
                   onSubmit={handlePost} enableReinitialize>
                    <Form className = "formulario">
                        <div key="replacements_input">
                        <label htmlFor="replacements_input">Repuesto</label>
                        
                        <Field
                        id="replacements_input"
                        name="replacements_input"
                        placeholder="replacements_input"                    
                        />
                        <ErrorMessage name="replacements_input" component='div' className='error'/>
                        </div>


                        <div key="diagnosis_input">
                        <label htmlFor="diagnosis_input">Diagnostico</label>
                        <Field
                        id="diagnosis_input"
                        name="diagnosis_input"
                        placeholder="diagnosis_input"
                        />
                        <ErrorMessage name="diagnosis_input" component='div' className='error'/>
                        </div>
                        <button type="submit">SUBMIT</button>
                    </Form>
                </Formik>
                </div>

    </>
}