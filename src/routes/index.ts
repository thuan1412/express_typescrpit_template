// import { Application } from "express";

// export default (app: Application) => {
//   require("fs")
//     .readdirSync("src/routes")
//     .forEach((fileName: string) => {
//       if (fileName === "index.js" || !fileName.endsWith('.js')) return;
//       app.use("/api/v1", require(`./${fileName}`));
//     });
// };

// export subtitleRouter = require("./subtitle");
export { default as subtitleRouter } from "./subtitle";
