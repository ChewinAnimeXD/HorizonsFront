import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TaskFormPage from "./pages/TaskFormPage";
import TasksPage from "./pages/TasksPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import CoursesPage from "./pages/CoursesPage";
import AddCoursesPage from "./pages/AddCoursesPage";
import CalificationsPage from "./pages/CalificationsPage";

import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import { ImageProvider } from "./context/ImageContext";
import { CourseProvider } from "./context/CoursesContext";
import { CalificationProvider } from "./context/CalificationContext";
import InfoCoursesPage from "./pages/InfoCoursesPage";
import AddCalifPage from "./pages/AddCalifPage";

function App() {
  return (
    <ImageProvider>
    <CalificationProvider>
      <CourseProvider>
        <AuthProvider>
          <TaskProvider>
            <BrowserRouter>
              <div className="flex">
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LoginPage />} />

                    <Route
                      element={<ProtectedRoute allowedRoles={["admin"]["teacher"]} />}
                    >
                      
                      <Route path="/courses" element={<CoursesPage />} />
                      
                      <Route path="/courses/:id" element={<AddCoursesPage />} />
                      <Route path="/infoCourses" element={<InfoCoursesPage />}/>
                      <Route path="/infoCourses/:id" element={<InfoCoursesPage />} />
                      <Route path="/califications" element={<CalificationsPage />} />
                      <Route path="/califications/:idstudent" element={<CalificationsPage />} />
                      <Route path="/califications/:idcourse/:idstudent" element={<CalificationsPage />} />
                      <Route path="/addCalification" element={<AddCalifPage />}/>
                      <Route path="/addCalification/:idstudent" element={<AddCalifPage />}/>
                      <Route path="/addCalification/:idcourse/:idstudent" element={<AddCalifPage />}/>
                      <Route path="/updateCalification/:id" element={<AddCalifPage />}/>

                    </Route>

                    <Route
                      element={<ProtectedRoute allowedRoles={["admin"]} />}
                    >
                      <Route path="/userPage" element={<UserPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/register/:id" element={<RegisterPage />} />
                      <Route path="/addCourse" element={<AddCoursesPage />} />

                    </Route>


                    <Route
                      element={<ProtectedRoute allowedRoles={["student"]} />}
                    >
                      <Route path="/courses" element={<CoursesPage />} />
                      <Route path="/courses/:id" element={<AddCoursesPage />} />
                      <Route path="/infoCourses" element={<InfoCoursesPage />}/>
                      <Route path="/infoCourses/:id" element={<InfoCoursesPage />} />
                      <Route path="/califications/:id" element={<CalificationsPage />} />
                      <Route path="/califications/:idstudent" element={<CalificationsPage />} />

                    </Route>
                    


                    <Route element={<ProtectedRoute />}>
                      <Route path="/homePage" element={<HomePage />} />
                      <Route path="/tasks" element={<TasksPage />} />
                      <Route path="/add-task" element={<TaskFormPage />} />
                      <Route path="/tasks/:id" element={<TaskFormPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/profile/:id" element={<ProfilePage />} />


                      <Route path="/courses" element={<CoursesPage />} />
                      <Route path="/addCourse" element={<AddCoursesPage />} />
                      <Route path="/courses/:id" element={<AddCoursesPage />} />
                      <Route path="/infoCourses" element={<InfoCoursesPage />}/>
                      <Route path="/infoCourses/:id" element={<InfoCoursesPage />} />
                    </Route>
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </TaskProvider>
        </AuthProvider>
      </CourseProvider>
    </CalificationProvider>
    </ImageProvider>
  );
}

export default App;
