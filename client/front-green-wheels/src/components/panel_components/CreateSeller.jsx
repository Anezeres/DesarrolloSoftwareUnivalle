import 'react-datepicker/dist/react-datepicker.css';
import {postCreateSeller } from '../../api/green_wheels.api';
import { CreateUserInGroup} from '../forms/CreateUserInGroup';

export const CreateSeller = () => {
    return <CreateUserInGroup postCreateUser={postCreateSeller} groupName="Vendedores"/>
}