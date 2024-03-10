import {PromocaoState,PromocaoStateAction } from "./types";

const promocaoStateReducer = (state:PromocaoState, action:PromocaoStateAction) => {
  switch (action.type) {
    case "CHANGE_CREATE_PROMOCAO_REQUEST_STATUS":
      return {
        ...state,
        createPromocaoRequestStatus: action.payload,
      };
    case "CHANGE_GET_PROMOCAO_REQUEST_STATUS":
      return {
        ...state,
        getPromocaoRequestStatus: action.payload,
      };
    case "CHANGE_UPDATE_PROMOCAO_REQUEST_STATUS":
      return {
        ...state,
        updatePromocaoRequestStatus: action.payload,
      };
    default:
      return state;
  }
};

export default promocaoStateReducer;
