import * as React from "react";
import Info from "./Info";
import AppContext from "../context";
import { ItemModel } from "../models/itemModel";
import { MainActions } from "../actions/mainActions";
import classnames from 'classnames';

interface SidebarBasketProps {
    onCancelItem: any,
    onCancel: any,
    items: ItemModel[],
    opened: boolean,
}

function SidebarBasket({onCancelItem, onCancel, items = [], opened}: SidebarBasketProps) {
    const [isOrderCompleted, setIsOrderCompleted] = React.useState<boolean>(false);
    const {basketItems=[], setBasketItems} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState<string>('');
    const basketSum = basketItems.reduce(
        (sum, obj) => obj.price + sum,
        0
    );

    /**
     * Добавляет заказ и удаляет позиции из корзины
     */
    const onClickOrder = async () => {
        try {
            MainActions.newOrder({items: basketItems})
                .then((data) => {
                    !!data.id
                    && setOrderId(data.id);
                })
            setIsOrderCompleted(true);
            setBasketItems([]);
            for (let i = 0; i < basketItems.length; i++) {
                const item = basketItems[i];
                await MainActions.deleteBasketItem(item.basketId);
            }
        } catch (error) {
            alert('Ошибка при создании заказа');
        }
    };

    return (
        <div
            className={classnames(
                'side-card',
            )}
        >
            <div
                className={classnames(
                    'side-card_block',
                    'p-30',
                    'flex-column',
                    'd-flex',
                    'justify-between',
                )}
            >
                {items.length ? (
                    <>
                        <div>
                            <div
                                className={classnames(
                                    'mb-30',
                                    'align-center',
                                    'd-flex',
                                    'justify-between',
                                )}
                            >
                                <h2>
                                    Корзина
                                </h2>
                                <div
                                    className={classnames(
                                        'card_button',
                                    )}
                                    onClick={onCancel}
                                >
                                    <img
                                        alt="cancel"
                                        src="/img/cancel_button.svg"
                                    />
                                </div>
                            </div>
                            <div
                                className={classnames(
                                    'items',
                                )}
                            >
                                {
                                    items.map((val) => (
                                        <div
                                            key={val.id}
                                            className={classnames(
                                                'basket-Item',
                                                'align-center',
                                                'd-flex',
                                                'justify-between',
                                                'p-20',
                                            )}
                                        >
                                            <img
                                                alt="product"
                                                width={70}
                                                height={70}
                                                src={val.imageUrl}
                                            />
                                            <div>
                                                <p>
                                                    {val.name}
                                                </p>
                                                <div
                                                    className={classnames(
                                                        'price',
                                                    )}
                                                >
                                                    {val.price} ₽
                                                </div>
                                            </div>
                                            <div
                                                className={classnames(
                                                    'card_button',
                                                )}
                                                onClick={
                                                    () => {onCancelItem(val.id)}
                                                }
                                            >
                                                <img
                                                    alt="cancel"
                                                    src="/img/cancel_button.svg"

                                                />
                                            </div>
                                        </div> ))
                                }
                            </div>
                        </div>
                        <div
                            className={classnames(
                                'total-basket',
                                'flex-column',
                            )}
                        >
                            <ul
                                className={classnames(
                                    'mb-25',
                                )}
                            >
                                <li
                                    className={classnames(
                                        'd-flex',
                                        'align-end',
                                    )}
                                >
                                    <span>
                                        Итого:
                                    </span>
                                    <div
                                        className={classnames(
                                            'd-flex',
                                            'dashes',
                                        )}
                                    >
                                    </div>
                                    <div
                                        className={classnames(
                                            'price',
                                        )}
                                    >
                                        {basketSum} ₽
                                    </div> 
                                </li>
                            </ul>
                            <button
                                className={classnames(
                                    'd-flex',
                                    'align-center',
                                    'justify-center',
                                )}
                                onClick={onClickOrder}
                            >
                                <div
                                    className={classnames(
                                        'd-flex',
                                        'align-center',
                                    )}
                                >
                                    <span
                                        className={classnames(
                                            'mr-10',
                                        )}
                                    >
                                        Оформить заказ
                                    </span>
                                    <img
                                        alt="arrow"
                                        width={14}
                                        height={12}
                                        src="/img/arrow.svg"
                                    />
                                </div>
                            </button>
                        </div>
                    </>
                ) : (<Info
                        title={
                            isOrderCompleted
                                ? 'Заказ оформлен!'
                                : 'Корзина пустая'
                        }
                        description={
                            isOrderCompleted
                                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы один товар, чтобы сделать заказ.'
                        }
                        image={
                            isOrderCompleted
                                ? '/img/complete-order.jpeg'
                                : '/img/empty-cart.jpeg'
                        }
                        onButtonClick={onCancel}
                    />)     
                }    
            </div>
        </div>
    );
}

export default SidebarBasket;
