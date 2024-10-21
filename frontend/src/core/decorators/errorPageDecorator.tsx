import ErrorPage from "@core/components/errorPage";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import { errorActions } from "@core/reducers/slices/error";
import { Rejector } from "@core/utils/rejector";

const ErrorPageDecorator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch()
    const { show, error } = useAppSelector((state) => state.error);

    if (show) {
        return (
            <ErrorPage
                open={show}
                onClose={() => {dispatch(errorActions.reset())}}
                detail={error?.detail ?? Rejector.standartReject().detail}
                status_code={error?.status_code ?? 500}
            />
        );
    }

    return <>{children}</>;
};

export default ErrorPageDecorator;
