import RequestStatus from "../../../../shared/types/request-status";
import CarrinhoModel from "../../models/CarrinhoModel";

export type CarrinhoStateAction = 
    | {
        type: "CHANGE_GET_CARRINHO_REQUEST_STATUS";
        payload: RequestStatus<CarrinhoModel[]>;
        }
    | {
        type: "CHANGE_UPDATE_CARRINHO_REQUEST_STATUS";
        payload: RequestStatus<any>;
        };

export interface CarrinhoState {
    getCarrinhoRequestStatus: RequestStatus<CarrinhoModel[]>;
    updateCarrinhoRequestStatus: RequestStatus<any>;
}