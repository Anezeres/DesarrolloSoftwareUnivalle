import { PersonForm } from "../forms/PersonForm";


export const RetrievePersonForm = (selectedOption, createMode) => {
    return <PersonForm createdMode={createMode}/>
}