import { Item } from "./item";
import { Employee } from "./employee";
import { RequisitionItem } from "./requisitionItem";

export class Requisition {
    requisitionItem: RequisitionItem [];
    id: number;
    employee: Employee;
    department: number;
    job: number;
    filled:boolean; 
    createDate: number;
}