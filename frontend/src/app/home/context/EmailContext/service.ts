import { Dispatch } from "react";
import { EmailStateAction } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { EmailFormType } from "../../forms/EmailForm";
import EmailModel from "../../models/EmailModel";
import { AppUnknownError } from "../../../../shared/errors/app-error";

export default class Emailervice {
  private apiService: ApiService;
  private dispatch: Dispatch<EmailStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<EmailStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async sendEmails(emailForm: EmailFormType): Promise<void> {
    this.dispatch({
      type: "CHANGE_CREATE_EMAIL_REQUEST_STATUS",
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post("/emails/enviarEmail", emailForm);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: "CHANGE_CREATE_EMAIL_REQUEST_STATUS",
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: "CHANGE_CREATE_EMAIL_REQUEST_STATUS",
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getAllEmails(): Promise<void> {
    try {
      this.dispatch({
        type: "CHANGE_GET_EMAIL_REQUEST_STATUS",
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get("/emails");

      result.handle({
        onSuccess: (response) => {
          const emails = response.data.map((test: any) => new EmailModel(test));

          this.dispatch({
            type: "CHANGE_GET_EMAIL_REQUEST_STATUS",
            payload: RequestStatus.success(emails),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: "CHANGE_GET_EMAIL_REQUEST_STATUS",
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: "CHANGE_GET_EMAIL_REQUEST_STATUS",
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async getSpamEmails(): Promise<void> {
    try {
      this.dispatch({
        type: "CHANGE_GET_EMAILSPAM_REQUEST_STATUS",
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get("/emails");

      result.handle({
        onSuccess: (response) => {
          const emails = response.data.map((test: any) => new EmailModel(test));

          this.dispatch({
            type: "CHANGE_GET_EMAILSPAM_REQUEST_STATUS",
            payload: RequestStatus.success(emails),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: "CHANGE_GET_EMAILSPAM_REQUEST_STATUS",
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: "CHANGE_GET_EMAILSPAM_REQUEST_STATUS",
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}
