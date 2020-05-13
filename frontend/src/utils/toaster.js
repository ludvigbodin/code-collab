import { toast } from "react-toastify";

const nofifyConfig = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined
};

export const notifySuccess = message => {
  toast.success(message, nofifyConfig);
};

export const notifyError = message => {
  toast.error(message, nofifyConfig);
};

export const notifyInfo = message => {
  toast.info(message, nofifyConfig);
};

export const notifyWarning = message => {
  toast.warning(message, nofifyConfig);
};
