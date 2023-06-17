import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveLocationsForm } from "../retrievers/RetrieveLocationsForms";

export const CreateLocations = () => {
    return <AbstractCreateEditPanel selectOptionList={['Headquarter', 'Concessionaire', 'Workshop']} 
    retriever = {RetrieveLocationsForm} />
}