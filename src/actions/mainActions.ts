import { ItemModel, ItemModelDTO } from "../models/itemModel";
import { BaseActions } from "./baseActions";
import { OrderModel, OrderModelDTO } from "../models/orderModel";

export class MainActions extends BaseActions {
    /**
     * Получить список элементов
     */
    static getListItems = (): Promise<ItemModel[]> => {
        return BaseActions.baseFetchApi("https://61f53c3462f1e300173c4065.mockapi.io/Items")
            .then(
                (js: ItemModelDTO[]) => js.map(
                    (el: ItemModelDTO) => new ItemModel(el)
                )
            );
    }
    
    /**
     * Получить список элементов корзины
     */
    static getListBasketItems = (): Promise<ItemModel[]> => {
        return BaseActions.baseFetchApi("https://61f53c3462f1e300173c4065.mockapi.io/BasketItems")
            .then(
                (array: ItemModelDTO[]) => array.map(
                    (el: ItemModelDTO) => new ItemModel(el)
                )
            );
    }

    /**
     * Получить список избранных элементов
     */
    static getListFavoriteItems = (): Promise<ItemModel[]> => {
        return BaseActions.baseFetchApi("https://61f53c3462f1e300173c4065.mockapi.io/FavoriteItems")
            .then(
                (array: ItemModelDTO[]) => array.map(
                    (el: ItemModelDTO) => new ItemModel(el)
                )
            );
    }
    
    /**
     * Удалить избранный элемент
     * @param id
     */
    static deleteFavoriteItem = (id: string): Promise<void> => {
        return BaseActions.baseFetchApi(
            `https://61f53c3462f1e300173c4065.mockapi.io/FavoriteItems/${id}`,
            'DELETE',
        );
    }

    /**
     * Удалить элемент корзины
     * @param id
     */
    static deleteBasketItem = (id: string): Promise<void> => {
        return BaseActions.baseFetchApi(
            `https://61f53c3462f1e300173c4065.mockapi.io/BasketItems/${id}`,
            'DELETE',
        );
    }

    /**
     * Добавить новый элемент корзины
     * @param obj
     */
    static newBasketItem = (obj: ItemModel): Promise<ItemModel> => {
        return BaseActions.baseFetchApi(
            `https://61f53c3462f1e300173c4065.mockapi.io/BasketItems`,
            'POST',
            obj,
        );
    }
    
    /**
     * Добавить новый избранный элемент
     * @param obj
     */
    static newFavoriteItem = (obj: ItemModel): Promise<ItemModel> => {
        return BaseActions.baseFetchApi(
            `https://61f53c3462f1e300173c4065.mockapi.io/FavoriteItems`,
            'POST',
            obj,
        );
    }

    /**
     * Получить список заказов
     */
    static getListOrders = (): Promise<OrderModel[]> => {
        return BaseActions.baseFetchApi("https://61f53c3462f1e300173c4065.mockapi.io/Orders")
            .then(
                (js: OrderModelDTO[]) => (
                    js.map((el: OrderModelDTO) => new OrderModel(el))
                )
            );
    }

    /**
     * Добавить новый заказ
     * @param obj
     */
    static newOrder = (obj: OrderModel): Promise<OrderModel> => {
        return BaseActions.baseFetchApi(
            `https://61f53c3462f1e300173c4065.mockapi.io/Orders`,
            'POST',
            obj,
        );
    }
}
