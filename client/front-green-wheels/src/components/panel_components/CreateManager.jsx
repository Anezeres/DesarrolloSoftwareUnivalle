import 'react-datepicker/dist/react-datepicker.css';
import {postCreateManager } from '../../api/green_wheels.api';
import { CreateUserInGroup} from '../forms/CreateUserInGroup';

export const CreateManager = () => {
    return (
    <div className='heading'>
    <div className='boxformularios'>
    <CreateUserInGroup postCreateUser={postCreateManager} groupName="Gerentes"/>
    </div>
    </div>
    )
}