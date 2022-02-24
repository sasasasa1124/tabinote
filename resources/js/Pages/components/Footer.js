import React from "react";

const articleStyle =  {
  display: "grid",
  gridTemplateRows: "auto 1fr auto"
};

const footerStyle =  {
  display: "flex",
  justifyContent: "center",
  padding: "5px",
  backgroundColor: "#45a1ff",
  color: "#fff"
};

const Footer = () => {
  return (
  <article style={articleStyle}>
    <ol>
        <li>github</li>
        <li>wechat</li>
    </ol>
    <footer style={footerStyle}>
        <p>© 2022 sasasasa1124</p>
    </footer>
  </article>);
};

export default Footer;