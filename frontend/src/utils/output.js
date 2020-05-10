// TODO fixa DEEP grejen
// 1. Fixa deep så att den funkar på allt
// 2, Fixa så att array skriver ut snyggt.
// 3. fixa så att getArrayListItem kan hantera object och array.

function getConsoleItem(value) {
  let consoleItem = document.createElement("li");
  consoleItem.className = "log-li";

  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return getArrayConsoleItem(value);
    } else {
      return getObjectConsoleItem(value);
    }
  } else {
    consoleItem.appendChild(getSpanItem(value));
  }

  return consoleItem;
}

function getObjectConsoleItem(obj) {
  let listItem = document.createElement("li");
  listItem.className = "log-li";
  listItem.innerHTML += "{ \n";

  let keys = Object.keys(obj);
  let deep = 0;

  keys.forEach((key, index) => {
    let value = obj[key];

    listItem.innerHTML +=
      getVariableSpanInnerHTML(key) + ": " + consoleCondition(value, deep);
    if (keys.length - 1 !== index) {
      listItem.innerHTML += ", ";
    }
    listItem.innerHTML += "\n";
  });
  listItem.innerHTML += "}";

  return listItem;
}

function getArrayConsoleItem(arr) {
  let listItem = document.createElement("li");
  listItem.className = "log-li";
  listItem.innerHTML += "[";

  let deep = 0;

  arr.forEach((value, index) => {
    //listItem.appendChild(getSpanItem(value));
    listItem.innerHTML += consoleCondition(value, deep);

    if (arr.length - 1 !== index) {
      listItem.innerHTML += ", ";
    }
  });
  listItem.innerHTML += "]";
  return listItem;
}

function consoleCondition(value, deep) {
  let valueToAdd = "";
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      valueToAdd = getArrayConsoleItemInnerHTML(value);
    } else {
      valueToAdd = getObjectConsoleItemInnerHTML(value, deep);
    }
  } else {
    valueToAdd = getSpanItemInnerHTML(value);
  }

  return valueToAdd;
}

function getArrayConsoleItemInnerHTML(arr, deep) {
  let innerHTML = "[";
  deep++;
  arr.forEach((value, index) => {
    innerHTML += consoleCondition(value, deep);
    if (arr.length - 1 !== index) {
      innerHTML += ", ";
    }
  });
  innerHTML += "]";
  return innerHTML;
}

function getObjectConsoleItemInnerHTML(obj, deep) {
  let innerHTML = "{ \n";

  let keys = Object.keys(obj);
  deep++;

  keys.forEach((key, index) => {
    let value = obj[key];

    innerHTML +=
      "  ".repeat(deep + 1) +
      getVariableSpanInnerHTML(key) +
      ": " +
      consoleCondition(value, deep);
    if (keys.length - 1 !== index) {
      innerHTML += ", ";
    }
    innerHTML += "\n";
  });
  innerHTML += "  ".repeat(deep) + "}";
  return innerHTML;
}

function getVariableSpanInnerHTML(value) {
  return `  <span class='log-variable'>${value}</span>`;
}

function getSpanItem(text) {
  let spanItem = document.createElement("span");
  spanItem.className = `log-${typeof text}`;
  spanItem.innerHTML = typeof text === "string" ? "'" + text + "'" : text;
  return spanItem;
}

function getSpanItemInnerHTML(text) {
  let className = `log-${typeof text}`;
  let value = typeof text === "string" ? '"' + text + '"' : text;
  let span = `<span class="${className}">${value}</span>`;
  return span;
}

export { getConsoleItem };
