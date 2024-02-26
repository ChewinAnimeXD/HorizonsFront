import { useParams } from "react-router-dom";
import { useCourses } from "../context/CoursesContext";
import InfoCourses from "../components/InfoCourses";
import Navbar from "../components/Navbar";

const InfoCoursesPage = () => {
    const { courses } = useCourses();
    const { id } = useParams();
    const courseToShow = courses.find(course => course._id === id);
    
    return (
      <Navbar>
        <div>
          
            {courseToShow ? (
                <InfoCourses course={courseToShow} />
            ) : (
                <p>No se encontró el curso</p>
            )}
        </div>
        </Navbar>
    );
}

export default InfoCoursesPage;
