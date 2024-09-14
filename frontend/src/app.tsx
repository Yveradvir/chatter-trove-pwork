import Layout from "@core/components/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Layout><></></Layout>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
