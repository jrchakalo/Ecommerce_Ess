import RequestStatus from "../../../../shared/types/request-status";
import EmailModel from "../../models/TestModel";

export type EmailStateAction =
  | {
      type: "CHANGE_CREATE_EMAIL_REQUEST_STATUS";
      payload: RequestStatus<any>;
    }
  | {
      type: "CHANGE_GET_EMAIL_REQUEST_STATUS";
      payload: RequestStatus<EmailModel[]>;
    }
  | {
      type: "CHANGE_GET_EMAILSPAM_REQUEST_STATUS";
      payload: RequestStatus<any>;
    };

export interface EmailState {
  createEmailRequestStatus: RequestStatus<any>;
  getEmailRequestStatus: RequestStatus<EmailModel[]>;
  getEmailSpamRequestStatus: RequestStatus<EmailModel[]>;
}
