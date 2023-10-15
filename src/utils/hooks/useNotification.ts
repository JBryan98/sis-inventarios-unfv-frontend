import { useSnackbar } from "notistack"

export const useNotification = () => {
    const { enqueueSnackbar } = useSnackbar();

    const notiSuccess = (message: string) => {
      enqueueSnackbar(message, {
        variant: "success",
      });
    };

    const notiError = (message: string) => {
      enqueueSnackbar(message, {
        variant: "error",
      });
    }

    const notiApiResponseError = (error: any) => {
      enqueueSnackbar(error.error, { variant: "error" });
      enqueueSnackbar(error.message, { variant: "error" });
    };

    return {
        notiSuccess,
        notiError,
        notiApiResponseError
    }
}