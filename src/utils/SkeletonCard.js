import React from "react";
import Skeleton from "react-loading-skeleton";
import { BeatLoader } from "react-spinners";

const SkeletonCard = () => {
  return (
    <section>
      {/* <h2 className="section-title">
        <Skeleton height={30} width={300} />
      </h2> */}

      <div className="container mt-5">
        <div className="row justify-content-center">
          <BeatLoader color={"#36D7B7"} size={15} margin={5} style={{marginLeft:"500px"}}/>
        </div>
      </div>
    </section>
  );
};
export default SkeletonCard;
