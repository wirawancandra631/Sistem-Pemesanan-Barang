import { toast } from "react-toastify";

export const FeedBackErrorComponent = (message) => {
  return toast(message, {
    position: "top-center",
    theme: "light",
    type: "error",
  });
};
export const FeedBackSuccessComponent = (message) => {
  return toast(message, {
    position: "top-center",
    theme: "light",
    type: "success",
  });
};
