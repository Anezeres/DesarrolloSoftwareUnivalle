import { PersonList } from "../components/PersonList";
import {Navbar} from '../layouts/Navbar';


/**
* @name: CarsPersontPage
* @description: Page component for showing the full full list of persons
* @author: Paul Rodrigo Rojas G
* @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
*/

export const PersonListPage = () => 
{
    return (
    <div>
        <Navbar/>
        <PersonList/>
    </div>);
}