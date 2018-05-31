import { Item } from "./item";
import { Employee } from "./employee";
import { requisitionItem } from "./requisitionItem";

export class Requisition {
    id: number;
    employee: Employee; //EMPLOYEE
    job: number;
    department: number;
    requisitionItem: requisitionItem;
    createDate: number;
    filled:boolean; 
}