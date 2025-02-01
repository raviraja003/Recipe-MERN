import ReviewCard from "../layouts/ReviewCard";
import img1 from "../assets/img/pic1.png";
import img2 from "../assets/img/pic2.png";
import img3 from "../assets/img/pic3.png";

const Review = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
      <h1 className=" text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
        Our Testimonials
      </h1>
      <p>"What Our Members Say"</p>
      <div className=" flex flex-col md:flex-row gap-5 mt-5">
        <ReviewCard img={img1} name="Alice D." />
        <ReviewCard img={img2} name="Jean L." />
        <ReviewCard img={img3} name="Sophie F." />
      </div>
    </div>
  );
};

export default Review;
