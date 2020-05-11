import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../actions/themeActions";
import { testAction } from "../../actions/roomActions";

function ThemeToggler() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  function toggle() {
    dispatch(testAction("test room"));
    dispatch(toggleTheme(theme));
  }

  return (
    <div id="theme-toggler-wrapper">
      <button className="theme-toggler-btn" onClick={toggle}>
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeToggler;
