import * as React from 'react';
import Item from '../components/Item';
import AppContext from '../context';
import Info from '../components/Info';
import { ItemModel } from '../models/itemModel';
import classnames from 'classnames';

function Favorites() {
    const {favoriteItems=[], onAddToFavorites, onAddToBasket} = React.useContext(AppContext);

    return (
        !!favoriteItems.length
            ? 
                <div
                    className={classnames(
                        'content',
                        'p-40',
                    )}
                >
                    <div
                        className={classnames(
                            'mb-40',
                            'align-end',
                            'd-flex',
                            'justify-between',
                        )}
                    >
                        <h1>
                            Мои закладки
                        </h1>
                    </div>
                    <div
                        className={classnames(
                            'd-flex',
                            'flex-wrap',
                        )}
                    >
                        {
                            favoriteItems.map(
                                (
                                    val: ItemModel,
                                    index: number
                                ) => (
                                    <div
                                        key={index}
                                    >
                                        <Item
                                            fav
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
            :
                <div
                    className={classnames(
                        'information',
                    )}
                >
                    <Info
                        title={'У вас нет закладок'}
                        description={'Добавьте хотя бы один товар в закладки'}
                        image={'/img/empty-cart.jpeg'}
                        link={"/"}
                    />
                </div>
    );
}

export default Favorites;
