import { Employee } from "./employee";
import { RequisitionItem } from "./requisitionItem";

export class Requisition {
    requisitionItem: RequisitionItem [];
    id: number;
    employee: Employee;
    department: number;
    job: string;
    filled:boolean; 
    createDate: number;
}