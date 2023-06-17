import {HeadquarterForm} from "../forms/HeadquarterForm";
import {ConcessionaireForm} from "../forms/ConcessionaireForm";
import {WorkshopForm} from "../forms/WorkshopForm";

export const RetrieveLocationsForm = (selectedOption, createMode) => {

    switch (selectedOption) {
        case 'Headquarter':
            return <HeadquarterForm createdMode={createMode}/>;
        case 'Concessionaire':
            return <ConcessionaireForm createdMode={createMode}/>;
        case 'Workshop':
            return <WorkshopForm createdMode={createMode}/>;
        default:
            return <p>Form not found!</p>
       }
}