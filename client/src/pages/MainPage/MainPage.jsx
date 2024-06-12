/**
 * Import Modules
 */
import { PageLayout } from "components/PageLayout";
import { CourseDetailPage } from "pages/CourseDetailPage";
import { CourseListPage } from "pages/CourseListPage";

import { Route, Routes } from "react-router-dom";
import { COURSE_LIST_ROUTE } from "routes";

/**
 * Main Page
 */
export const MainPage = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/*" element={<CourseListPage />} />
        <Route
          path={`${COURSE_LIST_ROUTE}/:courseId`}
          element={<CourseDetailPage />}
        />
      </Routes>
    </PageLayout>
  );
};
