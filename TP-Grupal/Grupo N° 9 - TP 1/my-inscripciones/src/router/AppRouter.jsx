import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";
import RouterProtect from "./RouterProtect";
import { Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/DashBoard/DashBoardPage";
import CoursesPage from "../pages/Courses/CoursesPage";
import CreateCoursePage from "../pages/Courses/CreateCoursePage";
import StudentsPage from "../pages/Students/StudentsPage";
import RegisterStudentPage from "../pages/Students/RegisterStudentPage";
import EnrollmentsPage from "../pages/Enrollments/EnrollmentsPage";
import CreateEnrollmentPage from "../pages/Enrollments/CreateEnrollmentPage.jsx"
import NotFoundPage from "../pages/NotFoundPage";


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Página pública */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/login"
          element={
            <MainLayout>
              <LoginPage />
            </MainLayout>
          }
        />

        {/* Rutas protegidas - Admin */}
        <Route
          path="/dashboard"
          element={
            <RouterProtect>
              <AdminLayout>
                <DashboardPage />
              </AdminLayout>
            </RouterProtect>
          }
        />
        <Route
          path="/courses"
          element={
            <RouterProtect>
              <AdminLayout>
                <CoursesPage />
              </AdminLayout>
            </RouterProtect>
          }
        />
        <Route
          path="/courses/create"
          element={
            <RouterProtect>
              <AdminLayout>
                <CreateCoursePage />
              </AdminLayout>
            </RouterProtect>
          }
        />
        <Route
          path="/students"
          element={
            <RouterProtect>
              <AdminLayout>
                <StudentsPage />
              </AdminLayout>
            </RouterProtect>
          }
        />
        <Route
          path="/students/register"
          element={
            <RouterProtect>
              <AdminLayout>
                <RegisterStudentPage />
              </AdminLayout>
            </RouterProtect>
          }
        />
        <Route
          path="/enrollments"
          element={
            <RouterProtect>
              <AdminLayout>
                <EnrollmentsPage />
              </AdminLayout>
            </RouterProtect>
          }
        />
        <Route
          path="/enrollments/create"
          element={
            <RouterProtect>
              <AdminLayout>
                <CreateEnrollmentPage />
              </AdminLayout>
            </RouterProtect>
          }
        />
      </Routes>
    </Router>
  );
}
