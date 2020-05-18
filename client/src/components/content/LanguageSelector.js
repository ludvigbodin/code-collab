import React from "react";

function LanguageSelector(props) {
  const { setLanguage } = props;

  function onChange(evt) {
    setLanguage(evt.target.value);
  }

  return (
    <div>
      <select id="languages" onChange={onChange}>
        <option value="javascript">javascript</option>
        <option value="java">java</option>
        <option value="python">python</option>
        <option value="c#">c#</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
