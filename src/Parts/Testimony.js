import React from "react";
import TestimonyAccent from "assets/images/testimonial-landingpages-frame.jpg";
import Star from "Elements/Star/index";
import Button from "Elements/Button";

export default function Testimony({ data }) {
  return (
    <section className="container">
      <div className="row align-items-center">
        <div className="col-auto" style={{ marginRight: 70 }}>
          <div className="testimonial-hero" style={{ margin: `30px 0 0 30px` }}>
            <img
              className="position-absolute"
              src={data.imageUrl}
              alt="Testimonial"
              style={{ zIndex: 1 }}
            />
            <img
              className="position-absolute"
              src={TestimonyAccent}
              alt="Testimonial frame"
              style={{ margin: `-30px 0 0 -30px` }}
            />
          </div>
        </div>
        <div className="col">
          <h4 style={{ marginBottom: 40 }}>{data.name}</h4>
          <Star value={data.rate} width={50} height={25} spacing={2} />
          <h5 className="h2 font-weigth-light line-height-2 my-3">
            {data.content}
          </h5>
          <span className="text-grey-500">
            {data.familyName},{data.familyOccupation}
          </span>
          <div>
            <Button
              className="btn px-5"
              style={{ marginTop: 40 }}
              type="link"
              isPrimary
              hasShadow
              href={`/testimonial/${data._id}`}
            >
              Read Their Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
