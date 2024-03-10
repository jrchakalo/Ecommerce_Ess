import { CarrinhoState, CarrinhoStateAction } from "./types";

const carrinhoStateReducer = (state: CarrinhoState, action: CarrinhoStateAction) => {
  switch (action.type) {
    case "CHANGE_GET_CARRINHO_REQUEST_STATUS":
      return {
        ...state,
        getCarrinhoRequestStatus: action.payload,
      };
    case "CHANGE_UPDATE_CARRINHO_REQUEST_STATUS":
      return {
        ...state,
        updateCarrinhoRequestStatus: action.payload,
      };
    default:
      return state;
  }
}

export default carrinhoStateReducer;