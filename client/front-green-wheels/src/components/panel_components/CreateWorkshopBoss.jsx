import 'react-datepicker/dist/react-datepicker.css';
import {postCreateWorkshopBoss } from '../../api/green_wheels.api';
import { CreateUserInGroup} from '../forms/CreateUserInGroup';

export const CreateWorkshopBoss = () => {
    return <CreateUserInGroup postCreateUser={postCreateWorkshopBoss} groupName="Jefes de taller"/>
}