import { PageLayout } from "components/PageLayout";
import { CourseListPage } from "pages/CourseListPage";

import { Route, Routes } from "react-router-dom";

export const MainPage = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/*" element={<CourseListPage />} />
      </Routes>
    </PageLayout>
  );
};
