export class BaseActions {
    /**
     * Стандартная обработка fetch запроса
     * @param url
     * @param method
     * @param data
     */
    static baseFetchApi(
        url: string,
        method: string = 'GET',
        data?: any,
        ): Promise<any>
        {
            const headers = {
                'Content-Type': 'application/json'
            };
            return fetch(
                url,
                {
                    method: method,
                    body: JSON.stringify(data),
                    headers: headers,
                },
            )
                .then((res) => res.json());
        };
}
