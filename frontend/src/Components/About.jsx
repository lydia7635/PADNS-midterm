/* eslint-disable react/prop-types */
import myAvatar from "../../assets/img/Leo.jpeg";
import { useEffect } from "react";

const About = ({ setPage }) => {
  useEffect(() => {
    setPage("About");
  });

  return (
    <>
      <div className="flex flex-col col-auto items-center justify-center h-[calc(100vh-4rem)]">
        <img
          className="object-cover h-60 w-60 rounded-full"
          src={myAvatar}
          alt="my avatar"
        />
        <h1 className="text-2xl m-6 font-bold">Chen, Yu-Yu</h1>
        <div>想睡覺但寫程式寫到睡不著……</div>
      </div>
    </>
  );
};

export default About;
