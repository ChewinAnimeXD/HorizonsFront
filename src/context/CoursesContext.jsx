import { createContext, useContext, useState } from "react";
import {
  createCourseRequest,
  deleteCourseRequest,
  getCoursesRequest,
  getCourseRequest,
  updateCourseRequest,
  deleteStudentFromCourseRequest
} from "../api/courses";

const CourseContext = createContext();

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) throw new Error("useCourses must be used within a CourseProvider");
  return context;
};

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const res = await getCoursesRequest();
      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const res = await deleteCourseRequest(id);
      if (res.status === 204) setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudentFromCourse = async (courseId, studentId) => {
    try {
      const res = await deleteStudentFromCourseRequest(courseId, studentId);
      if (res.status === 204) {
        setCourses(prevCourses =>
          prevCourses.map(course => {
            if (course._id === courseId) {
              return {
                ...course,
                students: course.students.filter(student => student._id !== studentId)
              };
            } else {
              return course;
            }
          })
        );
      }
    } catch (error) {
      
      console.log(error);
    }
  };

  const createCourse = async (course) => {
    try {
      const res = await createCourseRequest(course);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async (id) => {
    try {
      const res = await getCourseRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCourse = async (id, course) => {
    try {
      await updateCourseRequest(id, course);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        getCourses,
        deleteCourse,
        createCourse,
        getCourse,
        updateCourse,
        deleteStudentFromCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
