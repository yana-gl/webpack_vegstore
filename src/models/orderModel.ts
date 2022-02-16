import { ItemModel } from "./itemModel";

export interface OrderModelDTO {
    id?: string | null;
    items?: ItemModel[];
}

export class OrderModel {
    id?: string;
    items: ItemModel[];

    constructor(params: OrderModelDTO) {
        this.id = params.id ?? '';
        this.items = params.items ?? [];
    };
}
