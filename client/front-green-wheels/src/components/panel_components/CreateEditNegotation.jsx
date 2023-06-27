
import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveNegotationForm } from "../retrievers/RetrieveNegotationForm";



export const CreateEditNegotation = () => {

    return <AbstractCreateEditPanel selectOptionList={['Negotation']}
    retriever = {RetrieveNegotationForm}/>
}