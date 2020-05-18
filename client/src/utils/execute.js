export const executeCode = code => {
  let logger = document.getElementById("console");
  logger.innerHTML = "";
  try {
    let fn = new Function(code);
    fn();
  } catch (err) {
    console.log(err.name + ": " + err.message);
  }
};
