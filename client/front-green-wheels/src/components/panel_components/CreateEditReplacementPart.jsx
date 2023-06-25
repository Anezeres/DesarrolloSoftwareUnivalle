import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveReplacementPartForm } from "../retrievers/RetrieveReplacementPartForm";

export const CreateEditReplacementPart = () => {
    return <AbstractCreateEditPanel selectOptionList={['Replacements Parts']}
    retriever = {RetrieveReplacementPartForm}/>
}