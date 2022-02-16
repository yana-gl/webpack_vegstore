import * as React from 'react';
import Item from '../components/Item';
import Info from '../components/Info';
import classnames from 'classnames';
import { ItemModel } from '../models/itemModel';
import { MainActions } from '../actions/mainActions';
import { OrderModel } from '../models/orderModel';

function Profile() {
    const [orders, setOrders] = React.useState<OrderModel[]>([]);

    React.useEffect(
        () => {
                async function getResponseFromServer() {
                    MainActions.getListOrders()
                        .then((arr:OrderModel[])=>setOrders(arr));
                }
                getResponseFromServer();
            },
            [],
    );

    return (
        !!orders.length
            ?
                <div
                    className={classnames(
                        'content',
                        'p-40',
                        {
                            'new-class': !!orders.length,
                        },
                    )}
                >
                    <div
                        className="
                            d-flex
                            justify-between
                            mb-40
                            align-end
                        "
                    >
                        <h1>
                            Мои заказы
                        </h1>
                    </div>
                    <div>
                        {
                            orders.map((order, index: number) => (
                                <div
                                    key={index}
                                >
                                    <h2
                                        className="
                                            title
                                            mb-20
                                        "
                                    >
                                        Заказ №{order.id}
                                    </h2>
                                    <div
                                        className="
                                            d-flex
                                            flex-wrap
                                        "    
                                    >
                                        {
                                            order.items.map((val: ItemModel, index: number) => (
                                                <div
                                                    key={index}
                                                >
                                                    <Item
                                                        id={val.id}
                                                        name={val.name}
                                                        price={val.price}
                                                        imageUrl={val.imageUrl}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            :
                <div
                    className='information'    
                >
                    <Info
                        title={'У вас нет заказов'}
                        description={'Сделайте хотя бы один заказ'}
                        image={'/img/empty-cart.jpeg'}
                        link={"/"}
                    />
                </div>
    );
}

export default Profile;
