import * as React from 'react';
import Item from '../components/Item';
import Search from '../components/Search';
import AppContext from '../context';
import { ItemModel } from '../models/itemModel';
import classnames from 'classnames';

function Home() {
    const { items=[], onAddToFavorites, onAddToBasket, searchValue} = React.useContext(AppContext);

    /**
     * Получаем отфильтрованный массив
     */
    const filterItems = (): ItemModel[] => {
        return items
            .filter((val) => val.name
                .toLowerCase()
                .includes(searchValue
                    ? searchValue.toLowerCase()
                    : ''
                ))
    }

    return (
        <div
            className={classnames(
                'content',
                'p-40',
            )}
        >
            <div
                className={classnames(
                    'd-flex',
                    'justify-between',
                    'mb-40',
                    'align-end',
                )}
            >
                <h1>
                    {
                        searchValue
                            ? `Поиск по запросу: "${searchValue}"`
                            : 'Все товары'
                    }
                </h1>
                <Search />
            </div>
            <div
                className={classnames(
                    'd-flex',
                    'products',
                    'flex-wrap',
                )}
            >
                {
                    filterItems().map(
                        (val: ItemModel, index: number) => (
                            <div
                                key={index}
                            >
                                <Item
                                    id={val.id}
                                    name={val.name}
                                    price={val.price}
                                    imageUrl={val.imageUrl}
                                    onPlus={(obj: ItemModel) => onAddToBasket
                                        ? onAddToBasket(obj)
                                        : null}
                                    onFavorite={(obj: ItemModel) => onAddToFavorites
                                        ? onAddToFavorites(obj)
                                        : null}
                                />
                            </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;
