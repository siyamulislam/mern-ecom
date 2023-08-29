const app = require("./app");
const { serverPort } = require("./secrert");

app.listen(serverPort, () => {
    console.log(`server is running at http://localhost:${serverPort}`)
});

