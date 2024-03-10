import { EmailState, EmailStateAction } from "./types";

const emailStateReducer = (state: EmailState, action: EmailStateAction) => {
  switch (action.type) {
    case "CHANGE_CREATE_EMAIL_REQUEST_STATUS":
      return {
        ...state,
        createEmailRequestStatus: action.payload,
      };
    case "CHANGE_GET_EMAIL_REQUEST_STATUS":
      return {
        ...state,
        getEmailRequestStatus: action.payload,
      };
    case "CHANGE_GET_EMAILSPAM_REQUEST_STATUS":
      return {
        ...state,
        getEmailSpamRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default emailStateReducer;
