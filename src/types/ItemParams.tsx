import { ItemModel } from "../models/itemModel";

export interface ItemParams {
    name: string;
    price: number;
    imageUrl: string;
    id: string;
    onPlus?: (obj: ItemParams) => void
    onFavorite?: () => void;
    fav?: boolean;
    added?: boolean;
    favoriteId?: string;
    basketId?: string;
    key?: number;
}

export interface OrderParams {
    id: string;
    items: ItemModel[];
}
