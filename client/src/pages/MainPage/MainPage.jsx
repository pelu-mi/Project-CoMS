import { PageLayout } from "components/PageLayout";
import { Route, Routes } from "react-router-dom";

export const MainPage = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/*" element={<h1>Main Page</h1>} />
      </Routes>
    </PageLayout>
  );
};
