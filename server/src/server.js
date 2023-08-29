const app = require("./app");

const port = process.env.PORT || 3001; // Use the provided port or default to 3001

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
});

