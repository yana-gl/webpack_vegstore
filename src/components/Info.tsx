import * as React from "react";
import { Link } from "react-router-dom";
import classnames from 'classnames';

interface InfoProps {
    title: string,
    image: string,
    description: string,
    onButtonClick?: () => void;
    link?: string,
}

function Info({ title, image, description, onButtonClick, link }: InfoProps) {
    /**
     * Возвращает элемент - Зелёная кнопка
     */
    const goToBack = (): JSX.Element => {
        return (
            <button
                onClick={onButtonClick}
                className={classnames(
                    'greenButton'
                )}
            >
                <img
                    src="img/arrow.svg"
                    alt="Arrow"
                />
                Вернуться назад
            </button>
        )
    };

    return (
        <div
            className={classnames(
                'infoBlock',
                'd-flex',
                'align-center',
                'justify-center',
                'flex-column',
                'flex'
            )}
        >
            <img
                className={classnames(
                    'mb-20',
                )}
                width="120px"
                src={image}
                alt="Empty"
            />
            <div>
                <h2>
                    {title}
                </h2>
            </div>
            <div
                className={classnames(
                    'infoDescription',
                )}
            >
                {description}
            </div>
            {
                !!link
                    ?
                        <Link
                            to={link}
                        >
                            {goToBack()}
                        </Link>
                    : goToBack()
            }
      </div>
    )
}

export default Info;
