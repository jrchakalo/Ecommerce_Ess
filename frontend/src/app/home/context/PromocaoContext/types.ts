import RequestStatus from "../../../../shared/types/request-status";
import PromocaoModel from "../../models/PromocaoModel";

export type PromocaoStateAction =
  | {
      type: "CHANGE_CREATE_PROMOCAO_REQUEST_STATUS";
      payload: RequestStatus<any>;
    }
  | {
      type: "CHANGE_GET_PROMOCAO_REQUEST_STATUS";
      payload: RequestStatus<PromocaoModel[]>;
    }
  | {
      type: "CHANGE_UPDATE_PROMOCAO_REQUEST_STATUS";
      payload: RequestStatus<any>;
    };

export interface PromocaoState {
  createPromocaoRequestStatus: RequestStatus<any>;
  getPromocaoRequestStatus: RequestStatus<PromocaoModel[]>;
  updatePromocaoRequestStatus: RequestStatus<any>;
}
