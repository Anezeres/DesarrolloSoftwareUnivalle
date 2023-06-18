import { postCreateSeller, postCreateWorkshopBoss, createNewEmployee} from "../../api/green_wheels.api"
import {useState, useEffect} from "react";
import { AbstractCreateEditPanel } from "./AbstractCreateEditPanel";
import { RetrieveManageEmployeesForm } from "../retrievers/RetrieveManageEmployeesForm";


export const ManageUsersAsManager = () => {
    return <AbstractCreateEditPanel selectOptionList={['Seller', 'Workshopboss']} 
    retriever = {RetrieveManageEmployeesForm}/>
}