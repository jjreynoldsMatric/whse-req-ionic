import { ItemLocViewModel } from "./itemLocViewModel";

export class RequisitionItem {
    ItemLocViewModel: ItemLocViewModel;
    Id: any;
    RequisitionId: any;
	Item: string;
	ItemDescription: string;
	Quantity: number;
	Lot: number;
	ReasonCode: string;
	Operation: number;
	QuantityFilled: number;
	Filled: boolean;
	RequisitionItemActions: any;
}