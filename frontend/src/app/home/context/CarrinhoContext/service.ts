import { Dispatch } from "react";
import { ApiService } from "../../../../shared/services/ApiService";
import { CarrinhoStateAction } from "./types";
import RequestStatus from "../../../../shared/types/request-status";
import CarrinhoModel from "../../models/CarrinhoModel";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import { rmSync } from "fs";

export default class CarrinhoService {
    public apiService: ApiService;
    private dispatch: Dispatch<CarrinhoStateAction>;

    constructor({
        apiService,
        dispatch,
    }: {
        apiService: ApiService;
        dispatch: Dispatch<CarrinhoStateAction>;
    }) {
        this.apiService = apiService;
        this.dispatch = dispatch;
    }

    async getCarrinho(id: string): Promise<void> {
        try {
            this.dispatch({
                type: "CHANGE_GET_CARRINHO_REQUEST_STATUS",
                payload: RequestStatus.loading(),
            });

            const result = await this.apiService.get(`/cart/${id}`);

            result.handle({
                onSuccess: (response) => {
                    const carrinho = new CarrinhoModel(response.data);
                    this.dispatch({
                        type: "CHANGE_GET_CARRINHO_REQUEST_STATUS",
                        payload: RequestStatus.success([carrinho]), // Update the payload type to 'CarrinhoModel[]'
                    });
                },
                onFailure: (error) => {
                    console.log(error);
                    this.dispatch({
                        type: "CHANGE_GET_CARRINHO_REQUEST_STATUS",
                        payload: RequestStatus.failure(error),
                    });
                },
            });
        } catch (error) {
            this.dispatch({
                type: "CHANGE_GET_CARRINHO_REQUEST_STATUS",
                payload: RequestStatus.failure(new AppUnknownError()),
            });
        }
    }
}