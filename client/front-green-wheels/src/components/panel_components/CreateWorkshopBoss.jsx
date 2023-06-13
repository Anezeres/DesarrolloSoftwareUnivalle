import 'react-datepicker/dist/react-datepicker.css';
import {postCreateWorkshopBoss } from '../../api/green_wheels.api';
import { CreateUserInGroup} from '../forms/CreateUserInGroup';

export const CreateWorkshopBoss = () => {
    return (
    <div className='heading'>
    <div className='boxformularios'>
    <CreateUserInGroup postCreateUser={postCreateWorkshopBoss} groupName="Jefes de taller"/>
    </div>
    </div>
    )
}