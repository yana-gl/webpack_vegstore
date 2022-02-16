import React from 'react';
import { ItemModel } from './models/itemModel';

interface ContextProps {
    setBasketItems: any,
    isItemFavorite: (id: string) => boolean,
    items: ItemModel[],
    basketItems: ItemModel[];
    favoriteItems: ItemModel[];
    isItemAdded: (id: string) => boolean;
    onAddToFavorites: (obj: ItemModel) => Promise<void>;
    onAddToBasket: (obj: ItemModel) => Promise<void>;
    setBasketOpened: any;
    onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchValue: string;
}

const AppContext = React.createContext<Partial<ContextProps>>({});

export default AppContext;
