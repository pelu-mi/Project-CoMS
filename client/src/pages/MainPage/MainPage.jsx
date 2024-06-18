/**
 * Import Modules
 */
import { PageLayout } from "components/PageLayout";
import { CourseDetailPage } from "pages/CourseDetailPage";
import { CourseListPage } from "pages/CourseListPage";
import { DiscussionListPage } from "pages/DiscussionListPage";

import { Route, Routes } from "react-router-dom";
import { COURSE_LIST_ROUTE, FORUM_LIST_ROUTE } from "routes";

/**
 * Main Page
 */
export const MainPage = () => {
  const forumRelativePath = FORUM_LIST_ROUTE.replace("/", "");
  return (
    <PageLayout disableFullHeight>
      <Routes>
        <Route path="/*" element={<CourseListPage />} />
        <Route path={FORUM_LIST_ROUTE} element={<h1>All Forum list</h1>} />
        <Route path={`${COURSE_LIST_ROUTE}/:courseId`}>
          <Route index element={<CourseDetailPage />} />
          <Route path={forumRelativePath} element={<DiscussionListPage />} />
          <Route
            path={`${forumRelativePath}/:forumId`}
            element={<h1>Discussion detail</h1>}
          />
        </Route>
      </Routes>
    </PageLayout>
  );
};
