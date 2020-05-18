export const executeCode = code => {
  let logger = document.getElementById("console");
  logger.innerHTML = "";
  try {
    let fn = new Function(code);
    document.log("OK");
    fn();
  } catch (err) {
    document.log("ERR");
    console.log(err.name + ": " + err.message);
  }
};
