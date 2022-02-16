import AppContext from "../context";
import * as React from "react";
import classnames from 'classnames';

function Search() {
    const {onChangeSearchInput, searchValue} = React.useContext(AppContext);

    return (
        <div
            className={classnames(
                'search',
                'd-flex',
                'align-center',
            )}
        >
            <img
                alt="search"
                width={15}
                height={15}
                src="/img/search.svg"
                className={classnames(
                    'mr-10',
                )}
            />
            <input
                placeholder="Поиск..."
                onChange={onChangeSearchInput}
                value={searchValue}
            />
        </div>
    );
}

export default Search;
