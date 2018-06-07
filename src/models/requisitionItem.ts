import { ItemLocViewModel } from "./itemLocViewModel";

export class RequisitionItem {
    itemLocViewModel: ItemLocViewModel;
    id: any;
    requisitionId: any;
	item: string;
	itemDescription: string;
	quantity: number;
	lot: number;
	reasonCode: string;
	operation: number;
	quantityFilled: number;
	filled: boolean;
	requisitionItemActions: any;
}