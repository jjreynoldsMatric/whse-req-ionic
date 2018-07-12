import { Employee } from "./employee";
import { RequisitionItem } from "./requisitionItem";

export class Requisition {
    RequisitionItem: RequisitionItem [];
    Id: number;
    Employee: Employee;
    Department: number;
    Job: string;
    Filled:boolean; 
    CreateDate: number;
}