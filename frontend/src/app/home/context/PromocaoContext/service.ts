import { Dispatch } from "react";
import { PromocaoStateAction } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { PromocaoFormType } from "../../forms/PromocaoForm";
import { PromocaoUpdateFormType } from "../../forms/PromocaoUpdateForm";
import PromocaoModel from "../../models/PromocaoModel";
import { AppUnknownError } from "../../../../shared/errors/app-error";

export default class PromocaoService {
  private apiService: ApiService;
  private dispatch: Dispatch<PromocaoStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<PromocaoStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async createPromocao(promocaoForm: PromocaoFormType): Promise<void> {
    this.dispatch({
      type: "CHANGE_CREATE_PROMOCAO_REQUEST_STATUS",
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post("/promocoes/cadastro", promocaoForm);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: "CHANGE_CREATE_PROMOCAO_REQUEST_STATUS",
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: "CHANGE_CREATE_PROMOCAO_REQUEST_STATUS",
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getPromocoes(): Promise<void> {
    try {
      this.dispatch({
        type: "CHANGE_GET_PROMOCAO_REQUEST_STATUS",
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get("/promocoes/all");

      result.handle({
        onSuccess: (response) => {
          const promocoes = response.data.map((promocao: any) => new PromocaoModel(promocao));

          this.dispatch({
            type: "CHANGE_GET_PROMOCAO_REQUEST_STATUS",
            payload: RequestStatus.success(promocoes),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: "CHANGE_GET_PROMOCAO_REQUEST_STATUS",
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: "CHANGE_GET_PROMOCAO_REQUEST_STATUS",
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async getPromocao(promocaoId: string): Promise<void> {
    try {
      this.dispatch({
        type: "CHANGE_GET_PROMOCAO_REQUEST_STATUS",
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(`/promocoes/${promocaoId}`);

      result.handle({
        onSuccess: (response) => {
          const promocao = new PromocaoModel(response.data);

          this.dispatch({
            type: "CHANGE_GET_PROMOCAO_REQUEST_STATUS",
            payload: RequestStatus.success([promocao]),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: "CHANGE_GET_PROMOCAO_REQUEST_STATUS",
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: "CHANGE_GET_PROMOCAO_REQUEST_STATUS",
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async updatePromocao(promocaoForm: PromocaoUpdateFormType, promocaoId: string): Promise<void> {
    this.dispatch({
      type: "CHANGE_UPDATE_PROMOCAO_REQUEST_STATUS",
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.update(`/promocoes/${promocaoId}`, promocaoForm);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: "CHANGE_UPDATE_PROMOCAO_REQUEST_STATUS",
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: "CHANGE_UPDATE_PROMOCAO_REQUEST_STATUS",
          payload: RequestStatus.failure(error),
        });
      },
    });
  }
}
