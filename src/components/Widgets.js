import React from "react";
import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Widgets() {
  const newsArticle = (heading, subtitle) => {
    return (
      <div className="widgets-article">
        <div className="widgets-article-left">
          <FiberManualRecordIcon />
        </div>

        <div className="widgets-article-right">
          <h4>{heading}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="widgets">
      <div className="widgets-header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle(
        "Finished my simplified LinkedIn clone!",
        "Top news - 1000 readers"
      )}
      {newsArticle("Chat GPT is taking over", "Top news - 900 readers")}
      {newsArticle("Top 10 50k super cars", "Cars - 50 readers")}
      {newsArticle("Google is losing the AI war", "Big tech - 200 readers")}
    </div>
  );
}

export default Widgets;
