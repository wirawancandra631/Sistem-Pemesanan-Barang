import { toast } from "react-toastify";

export const FeedBackErrorComponent = (message) => {
  return toast(message, {
    position: "bottom-right",
    theme: "light",
    type: "error",
  });
};
export const FeedBackSuccessComponent = (message) => {
  return toast(message, {
    position: "bottom-right",
    theme: "light",
    type: "success",
  });
};
