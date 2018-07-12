import { ItemLocViewModel } from "./itemLocViewModel";
import { ReasonCode } from "./reason-code";

export class Item {
    MatricPN: string;
    QuantityRequested: number;
    QuantityFilled?: number;
    LotNum?: number;
    ReasonCode: ReasonCode ; //REASON CODE
    Operation?: number;
    Locations: ItemLocViewModel; //LOCATIONS 
    ItemReqID: any;
}
