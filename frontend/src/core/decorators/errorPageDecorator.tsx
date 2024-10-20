import ErrorPage from "@core/components/errorPage";
import { useAppSelector } from "@core/reducers";
import { Rejector } from "@core/utils/rejector";

const ErrorPageDecorator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { show, error, to } = useAppSelector((state) => state.error);

    if (show) {
        return (
            <ErrorPage
                to={to}
                detail={error?.detail ?? Rejector.standartReject().detail}
                status_code={error?.status_code ?? 500}
            />
        );
    }

    return <>{children}</>;
};

export default ErrorPageDecorator;
