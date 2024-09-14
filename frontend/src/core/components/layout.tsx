import Header from "./header";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
    return (
        <div>
            <Header />
            <main className="container">
                {children}
            </main>
        </div>
    );
}

export default Layout;