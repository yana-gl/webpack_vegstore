import {Link} from "react-router-dom";
import AppContext from "../context";
import * as React from "react";
import classnames from 'classnames';

interface HeaderProps {
    onBasket: () => void;
}

function Header(props: HeaderProps) {
    const { basketItems=[] } = React.useContext(AppContext);

    const basketSum = basketItems.reduce(
        (sum, obj) => obj.price + sum,
        0
    );

    return (
        <header
            className={classnames(
                'justify-between',
                'align-center',
                'd-flex',
                'p-40',
            )}
        >
            <Link
                to="/"
            >
                <div
                    className={classnames(
                        'header_company',
                        'align-center',
                        'd-flex',
                    )}
                >
                    <img
                        alt="card"
                        width={42}
                        height={42}
                        src="/img/logo.svg"
                        className="mr-15"
                    />
                    <div
                        className={classnames(
                            'header_company-info',
                        )}
                    >
                        <h3>VEG STORE</h3>
                        <p>Магазин веганских продуктов</p>
                    </div>
                </div>
            </Link>
            
            <ul
                className={classnames(
                    'header_profile',
                    'align-center',
                    'd-flex',
                )}
            >
                <li
                    className={classnames(
                        'mr-30',
                        'align-center',
                        'd-flex',
                        'cu-p',
                    )}
                    onClick={props.onBasket}
                >
                    <img
                        alt="basket"
                        width={20}
                        height={20}
                        src="/img/basket.svg"
                        className={classnames(
                            'mr-10',
                        )}
                    />
                    <div>
                        {basketSum} ₽
                    </div>
                </li>
                <li>
                    <Link
                        to="/fav"
                    >
                        <img
                            alt="favorites"
                            width={20}
                            height={20}
                            src="/img/favorites.svg"
                            className={classnames(
                                'mr-30',
                                'cu-p'
                            )}
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/profile"
                    >
                        <img
                            alt="profile"
                            width={20}
                            height={20}
                            src="/img/Union.svg"
                            className={classnames(
                                'cu-p'
                            )}
                        />
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;
