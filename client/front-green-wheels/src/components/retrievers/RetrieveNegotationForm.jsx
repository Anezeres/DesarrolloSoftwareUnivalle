import { NegotationForm } from "../forms/NegotationForm";


export const RetrieveNegotationForm = (selectedOption, createMode) => {
    return <NegotationForm createdMode={createMode}/>
}