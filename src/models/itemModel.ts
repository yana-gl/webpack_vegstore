export interface ItemModelDTO {
    id?: string | null;
    imageUrl?: string | null;
    name?: string | null;
    price?: number | null;
    basketId?: string | null;
    favoriteId?: string | null;
}

export class ItemModel {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    basketId: string;
    favoriteId: string;

    constructor(params: ItemModelDTO) {
        this.id = params.id ?? '';
        this.imageUrl = params.imageUrl ?? '';
        this.name = params.name ?? '';
        this.price = params.price ?? 0;
        this.basketId = params.basketId ?? '';
        this.favoriteId = params.favoriteId ?? '';
    };
}

export class BasketItemModel {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    basketId: string;

    constructor(params: ItemModelDTO) {
        this.id = params.id ?? '';
        this.imageUrl = params.imageUrl ?? '';
        this.name = params.name ?? '';
        this.price = params.price ?? 0;
        this.basketId = params.basketId ?? '';
    };
}

export class FavoriteItemModel {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    favoriteId: string;

    constructor(params: ItemModelDTO) {
        this.id = params.id ?? '';
        this.imageUrl = params.imageUrl ?? '';
        this.name = params.name ?? '';
        this.price = params.price ?? 0;
        this.favoriteId = params.favoriteId ?? '';
    };
}
