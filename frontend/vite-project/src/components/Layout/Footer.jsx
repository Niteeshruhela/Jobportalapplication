import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By NiteeshRohela.</div>
      <div>
        <Link to={"https://github.com/Niteeshruhela"} target="_blank">
          <FaGithub />
        </Link>
        <Link to={"https://www.linkedin.com/in/niteesh-rohela-154692224/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/vansh.lifts07/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
