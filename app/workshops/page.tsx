import AutoSlider from "../components/ui/HorizontalSlider";

const sliderItems = [
    {
      image: "/images/course1.png",
      content: "نصائح هامة للشباب قبل الزواج",
      name: "سالم عبدالله",
      soon: true,
    },
    {
      image: "/images/course2.png",
      content: "Learn the fundamentals of data analysis and visualization.",
      name: "Data Science Essentials",
      soon: true,
    },
    {
      image: "/images/course3.png",
      content: "Build and deploy machine learning models with ease.",
      name: "Machine Learning Bootcamp",
      soon: false,
    },
    {
      image: "/images/course4.png",
      content: "Improve your English communication skills for the workplace.",
      name: "Business English Communication",
      soon: true,
    },
    {
      image: "/images/course5.png",
      content: "Master Excel for business, finance, and data analysis.",
      name: "Advanced Excel for Professionals",
      soon: false,
    },
  ];
  

export default function Workshops() {
    return (
        <div className="px-4 md:px-0">
            <div className="font-[800] text-[#FFFFFF] text-[20px] md:text-[32px] flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-1 pr-0 md:pr-25 pb-6 md:pb-13 text-center md:text-right" dir="rtl">
                <span>دورات و ورش</span>
                <span className="text-[#BE1622]">تدريبية قادمة</span>
            </div>
            <AutoSlider items={sliderItems} />
        </div>
    )
}