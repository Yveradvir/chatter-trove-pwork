import IndexPage from "@core/routes/index.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
