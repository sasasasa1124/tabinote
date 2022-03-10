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
    <footer style={footerStyle}>
        <p>© 2022 <a href='https://github.com/sasasasa1124'>@sasasasa1124</a></p>
    </footer>    
  </article>);
};

export default Footer;