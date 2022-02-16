import React from "react";
import AppContext from "../context";
import classnames from 'classnames';

interface ItemProps {
    name: string;
    price: number;
    imageUrl: string;
    id: string;
    onPlus?: (obj: any) => void;
    onFavorite?: (obj: any) => void;
    fav?: boolean;
    added?: boolean;
}

function Item(props: ItemProps) {
    const {isItemAdded, isItemFavorite} = React.useContext(AppContext);

    /**
     * Добавляет объект в корзину
     */
    const onClickPlus = () => {
        if (!props.onPlus) return;
        props.onPlus({
            name: props.name,
            price: props.price,
            imageUrl: props.imageUrl,
            id: props.id,
        });
    }

    /**
     * Добавляет объект в закладки
     */
    const onClickFavorite = () => {
        if (!props.onFavorite) return;
        props.onFavorite({
            name: props.name,
            price: props.price,
            imageUrl: props.imageUrl,
            id: props.id
        });
    }

    return (
        <div
            className={classnames(
                'card',
                'p-10',
                'mb-30',
                'mr-30',
            )}
        >
            {props.onFavorite && (
                <div
                    className={classnames(
                        'liked',
                    )}
                    onClick={onClickFavorite}
                >
                    <img
                        alt='unliked_button'
                        src={
                            isItemFavorite && isItemFavorite(props.id)
                                ? '/img/liked_button.svg'
                                : '/img/unliked_button.svg'
                        }
                    />
                </div>
            )}
            <img
                alt='productPhoto'
                width={120}
                height={120}
                src={props.imageUrl}
                className={classnames(
                    'productPhoto',
                )}
            />
            <h4>
                {props.name}
            </h4>
            <div
                className={classnames(
                    'd-flex',
                    'justify-between',
                    'align-end',
                )}
            >
                <div
                    className={classnames(
                        'price',
                    )}
                >
                    {props.price} ₽
                </div>
                {props.onPlus && (
                    <div
                        className={classnames(
                            'card_button',
                        )}
                        onClick={ onClickPlus }
                    >
                        <img
                            alt='plus'
                            src={
                                isItemAdded && isItemAdded(props.id)
                                    ? '/img/added_button.svg'
                                    : '/img/plus.svg'
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Item;
