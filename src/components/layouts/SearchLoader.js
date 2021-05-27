import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SearchLoader() {
  return (
    <div>
      <div className="row">
        <div className="col-3">
          <div className="c-omni-suggestion-item__media">
            <div
              className="c-omni-suggestion-item__media__item"
              style={{ width: "130%", height: "76px" }}
            >
              <Skeleton style={{ width: "80%", height: "100%" }} />
            </div>
          </div>
        </div>
        <div className="col-9">
          <span className="c-omni-suggestion-item__content">
            <div
              data-qa-id="omni-suggestion-main"
              className="c-omni-suggestion-item__content__title"
              style={{ height: "30px" }}
            >
              {" "}
              <Skeleton style={{ width: "100%", height: "50%" }} />
            </div>
            <Skeleton style={{ width: "50%" }} />
          </span>
        </div>
      </div>
       
        <br/>
      <div className="row">
        <div className="col-3">
          <div className="c-omni-suggestion-item__media">
            <div
              className="c-omni-suggestion-item__media__item"
              style={{ width: "130%", height: "76px" }}
            >
              <Skeleton style={{ width: "80%", height: "100%" }} />
            </div>
          </div>
        </div>
        <div className="col-9">
          <span className="c-omni-suggestion-item__content">
            <div
              data-qa-id="omni-suggestion-main"
              className="c-omni-suggestion-item__content__title"
              style={{ height: "30px" }}
            >
              {" "}
              <Skeleton style={{ width: "100%", height: "50%" }} />
            </div>
            <Skeleton style={{ width: "50%" }} />
          </span>
        </div>
      </div>
    
      <br/>
      <div className="row">
        <div className="col-3">
          <div className="c-omni-suggestion-item__media">
            <div
              className="c-omni-suggestion-item__media__item"
              style={{ width: "130%", height: "76px" }}
            >
              <Skeleton style={{ width: "80%", height: "100%" }} />
            </div>
          </div>
        </div>
        <div className="col-9">
          <span className="c-omni-suggestion-item__content">
            <div
              data-qa-id="omni-suggestion-main"
              className="c-omni-suggestion-item__content__title"
              style={{ height: "30px" }}
            >
              {" "}
              <Skeleton style={{ width: "100%", height: "50%" }} />
            </div>
            <Skeleton style={{ width: "50%" }} />
          </span>
        </div>
      </div>
    </div>
  );
}
