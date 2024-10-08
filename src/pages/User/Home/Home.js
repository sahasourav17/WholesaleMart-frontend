import React from "react";
import { setTitle } from "../../../utils/setTitle";
import { Banner } from "./Banner";
import { BestCategory } from "./BestCategory";
import { BrandSlider } from "./BrandSlider";
import { FeaturedProduct } from "./FeaturedProduct";
import { ForYouProduct } from "./ForYouProduct";
import { Subscribe } from "./Subscribe";

export const Home = () => {
  //set page title
  setTitle("Shop in ease");
  return (
    <>
      <Banner />
      <FeaturedProduct />
      <BestCategory />
      <ForYouProduct />
      <BrandSlider />
      <Subscribe />
    </>
  );
};
