import { Employee } from "./employee";

export class PartRequest {
    itemReqId: number;
    processedBy: Employee;
    quantity: number;
    location: string;
    lot: string;
}