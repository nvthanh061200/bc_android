const account_routes= require("./account.routes");
function routes(app){
    app.use("/account",account_routes);
}
module.exports = routes;