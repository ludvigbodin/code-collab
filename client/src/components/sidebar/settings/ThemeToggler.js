import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../actions/themeActions";
import ToggleButton from "react-toggle-button";

function ThemeToggler() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  function toggle() {
    dispatch(toggleTheme(theme));
  }

  const isActive = theme === "dark";

  return (
    <div className="settings-item-wrapper">
      <ToggleButton
        value={isActive}
        onToggle={toggle}
        inactiveLabel={"Light"}
        activeLabel={"Dark"}
      />
      <h3 id="toggle-text"> Theme </h3>
    </div>
  );
}

export default ThemeToggler;
