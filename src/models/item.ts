import { ItemLocViewModel } from "./locations";
import { ReasonCode } from "./reason-code";

export class Item {
    matricPN: string;
    quantityRequested: number;
    quantityFilled?: number;
    lotNum?: number;
    reasonCode: ReasonCode ; //REASON CODE
    operation?: number;
    locations: ItemLocViewModel; //LOCATIONS 
    itemReqID: any;
}
