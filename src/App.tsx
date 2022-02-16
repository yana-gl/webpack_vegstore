import React from 'react';
import Header from './components/Header';
import SidebarBasket from './components/SidebarBasket';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Profile from './pages/Profile';
import { ItemModel } from './models/itemModel';
import { MainActions } from './actions/mainActions';
import classnames from 'classnames';

interface AppProps {
    children?: React.ReactElement;
}

function App({children}: AppProps) {
    React.useEffect(
        () => {
            async function getResponseFromServer() {
                MainActions.getListItems()
                    .then((
                        arr:ItemModel[])=>setItems(arr)
                    );
                
                MainActions.getListBasketItems()
                    .then((
                        arr:ItemModel[])=>setBasketItems(arr)
                    );

                MainActions.getListFavoriteItems()
                    .then((
                        arr:ItemModel[])=>setFavoriteItems(arr)
                    );
            }
            getResponseFromServer();
        },
        []
    );

    const [items, setItems] = React.useState<ItemModel[]>([]);
    const [basketItems, setBasketItems] = React.useState<ItemModel[]>([]);
    const [favoriteItems, setFavoriteItems] = React.useState<ItemModel[]>([]);
    const [basketOpened, setBasketOpened] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>('');

    /**
     * Открыть корзину
     */
    const onBasketClick = () => {
        setBasketOpened(true);
    }

    /**
     * Закрыть корзину
     */
    const onCancelClick = () => {
        setBasketOpened(false);
    }

    /**
     * Обработка события изменения строки поиска
     */
    const onChangeSearchInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchValue(event.target.value);
    }

    /**
     * Добавляет объект в закладки
     * @param obj
     */
    const onAddToFavorites = async (obj: ItemModel) => {
        try {
            if(favoriteItems.find(item => item.id === obj.id)) {
                const favoriteItem = favoriteItems.find(item => item.id === obj.id);
                if (!!favoriteItem) {
                    const id = favoriteItem.favoriteId;
                    MainActions.deleteFavoriteItem(id);
                    setFavoriteItems(prev => prev.filter((item) => item.id !== obj.id));
                }
            } else {
                MainActions.newFavoriteItem(obj)
                    .then(data => setFavoriteItems(prev => [...prev , data]));
            }
        } catch(error) {
            alert('Не удалось добавить в закладки');
        }   
    }

    /**
     * Добавляет объект в корзину
     * @param obj
     */
    const onAddToBasket = async (obj: ItemModel) => {
        try {
            if(basketItems.find(item => Number(item.id) === Number(obj.id))) {
                const basketItem = basketItems.find(item => item.id === obj.id);
                if (!!basketItem) {
                    const id = basketItem.basketId;
                    MainActions.deleteBasketItem(id);
                    setBasketItems(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)));
                }
                
            } else {
                MainActions.newBasketItem(obj)
                    .then(data => setBasketItems(prev => [...prev , data]));
            }
        } catch(error) {
            alert('Не удалось добавить в корзину');
        }
    }

    /**
     * Удаляет объект из корзины по id
     * @param id
     */
    const onRemoveBasketItem = (id: string) => {
        MainActions.deleteBasketItem(id);
        setBasketItems(prev => prev.filter((item) => item.id !== id));
    }

    /**
     * Проверяет объект на содержание в корзине 
     * @param id
     * @returns boolean
     */
    const isItemAdded = (id: string): boolean => {
        return basketItems.some(obj => Number(obj.id) === Number(id));
    }

    /**
     * Проверяет объект на содержание в закладках 
     * @param id
     * @returns boolean
     */
    const isItemFavorite = (id: string) => {
        return favoriteItems.some(obj => Number(obj.id) === Number(id));
    }

    return (
        <AppContext.Provider
            value={{
                items, basketItems, favoriteItems,
                isItemAdded, onAddToFavorites, onAddToBasket,
                setBasketOpened, setBasketItems, isItemFavorite,
                onChangeSearchInput, searchValue,
            }}
        >
            <div
                className={classnames(
                    'wrapper',
                    'clear',
                )}
            >
                {basketOpened
                    ?
                        <SidebarBasket
                            items={basketItems}
                            onCancel={onCancelClick}
                            onCancelItem={onRemoveBasketItem}
                            opened={basketOpened}
                        />
                    :
                        null
                }
                <Header
                    onBasket={onBasketClick}
                />
                <Route
                    path="/"
                    exact
                >
                    <Home />
                </Route>      
                <Route path="/fav">
                    <Favorites />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
