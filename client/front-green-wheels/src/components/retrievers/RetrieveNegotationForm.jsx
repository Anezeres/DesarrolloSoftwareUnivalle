import { NegotationForm } from "../forms/NegotationForm";


export const RetrieveNegotationForm = (selectedOption, createMode, sellerId) => {
    return <NegotationForm createdMode={createMode} sellerId={sellerId}/>
}