import Hero from "./hero/page";
  import Courses from "./courses/page";
  import Workshops from "./workshops/page";
  import Categories from "./categories/page";
  import FreeCourses from "./freecourses/page";
  import Reviews from "./reviews/page";
  import Journey from "./journey/page";
  import World from "./world/page";
  import Tadarabbusiness from "./components/business/Business";
  import Trainers from "./components/trainers/trainers";
  import Banner from "./components/banner/Banner";
  import Questions from "./components/questions/Questions";
  export default function Home() {
  return (
    <div className=" flex flex-col gap-20">
      <Hero />
      <Courses />
       <Workshops />
       <Categories />
       <FreeCourses />
       <Reviews />
       <Journey />
       <World />
       <Tadarabbusiness />
       <Trainers />
       <Banner />
       <Questions />
    </div>
  );
}
