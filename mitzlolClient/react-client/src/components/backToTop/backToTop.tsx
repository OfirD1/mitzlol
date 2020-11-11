import React, { useEffect } from "react";
import "./backToTop.css";

const BackToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () =>
      catchScroll(isVisible, setIsVisible)
    );
  }, [isVisible]);
  const backToTop = () => smoothscroll();
  return (
    <div className="back-to-top back-to-top-inactive" onClick={backToTop}>
      <div className="default">
        <span>חזרה למעלה</span>
      </div>
    </div>
  );
};

const smoothscroll = () => {
  let currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothscroll);
    window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5));
  }
};
const catchScroll = (
  prevIsVisible: boolean,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const offset = 200;
  const newIsVisible = window.pageYOffset > offset;
  if (prevIsVisible !== newIsVisible) {
    setIsVisible(newIsVisible);
    setVisibilityCSS(newIsVisible);
  }
};
const setVisibilityCSS = (newIsVisible: boolean) => {
  var element = document.getElementsByClassName(
    "back-to-top"
  )[0] as HTMLElement;
  element.style.display = "block";
  setTimeout(function () {
    element.className = [
      "back-to-top",
      newIsVisible ? "back-to-top-active" : "back-to-top-inactive",
    ].join(" ");
  }, 0);
};

export default BackToTop;
