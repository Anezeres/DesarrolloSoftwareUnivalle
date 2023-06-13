import 'react-datepicker/dist/react-datepicker.css';
import {postCreateSeller } from '../../api/green_wheels.api';
import { CreateUserInGroup} from '../forms/CreateUserInGroup';

export const CreateSeller = () => {
    return ( <div className='heading'>
    <div className='boxformularios'>
    <CreateUserInGroup postCreateUser={postCreateSeller} groupName="Vendedores"/>
    </div>
    </div>
    )
}