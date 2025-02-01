// import React from "react";
import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";
// import img4 from "../assets/img/img4.jpg";
// import img5 from "../assets/img/img5.jpg";
// import img6 from "../assets/img/img6.jpg";
import DishesCard from "../layouts/DishesCard";

const Dishes = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 bg-gray-50">
      <h1 className=" text-4xl font-semibold text-center pt-24 pb-10">
        Feature Highlights
      </h1>

      <div className=" flex flex-wrap gap-8 justify-center">
        <DishesCard
          img={img1}
          title="Discover World Cuisines"
          description="Explore curated articles and videos about diverse cuisines, their
          cultural origins, and unique cooking techniques."
        />
        <DishesCard
          img={img2}
          title="Participate in Challenges"
          description="Join weekly AI-generated challenges featuring global cuisines. Test your cooking skills and learn something new!"
        />
        <DishesCard
          img={img3}
          title="Share Your Creations"
          description="Upload your completed dishes, share their stories, and interact with other users by liking and commenting."
        />
        {/* <DishesCard img={img4} title="Tasty Dish" price="$11.99" />
        <DishesCard img={img5} title="Tasty Dish" price="$10.99" />
        <DishesCard img={img6} title="Tasty Dish" price="$12.99" /> */}
      </div>
    </div>
  );
};

export default Dishes;
