import NewCourses from "../components/newcourses/newCourses";
import BestSellerCourses from "../components/bestsellercourses/bestSellerCourses";

export default function Courses() {
  return (
    <div className="flex flex-col gap-20 md:mr-15">
        <BestSellerCourses />
          <NewCourses />
    </div>
  );
}