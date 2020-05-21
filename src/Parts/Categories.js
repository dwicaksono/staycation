import React from "react";
import Button from "Elements/Button";

export default function Categories({ data }) {
  return data.map((category, idxCatgory) => {
    return (
      <section className="container" key={`category-${idxCatgory}`}>
        <h4 className="mb-3 font-weight-medium">{category.name}</h4>
        <div className="container-grid">
          {category.length === 0 ? (
            <div className="row">
              <div className="col-auto align-items-center">
                There is no property at this category
              </div>
            </div>
          ) : (
            category.items.map((item, idxItem) => {
              return (
                <div
                  className="item column-3 row-1"
                  key={`category-${idxCatgory}-item-${idxItem}`}
                >
                  <div className="card">
                    {item.isPopular && (
                      <div className="tag">
                        Popular<span className="font-weight-light">Choice</span>
                      </div>
                    )}
                    <figure className="img-wrapper" style={{ height: 180 }}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="img-cover"
                      />
                    </figure>
                    <div className="meta-wrapper">
                      <Button
                        type="link"
                        href={`/properties/${item._id}`}
                        className="stretched-link d-block"
                      >
                        <h5 className="h4">{item.name}</h5>
                        <span>{`${item.city}, ${item.country}`}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    );
  });
}
