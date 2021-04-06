const account=require("../controller/account.controller");

const express = require("express");
const routes = express.Router();

routes.post("/reg",account.reg);
routes.post("/login",account.login);
routes.get("/information",account.check_token,account.information);

//-----------works-----------
routes.post("/work",account.check_token,account.post_work);
routes.delete("/work",account.check_token,account.delete_work);
//----------ground-------------
routes.post("/group",account.check_token,account.create_group); // ok 
routes.post("/reg_member_group",account.check_token,account.reg_member_group); // dăng ký thành viên group
routes.post("/work_group",account.check_token,account.post_work_group);

routes.get("/work_group",account.check_token,account.work_group);
routes.get("/group_user",account.check_token,account.group_user); // get thong tin nhom ma user do tham gia
routes.get("/get_content_user",account.check_token,account.get_content_user); // get thong tin các công việc cả user đó
routes.get("/get_information_group",account.check_token,account.get_information_group); // get thong tin các công việc cả user đó



module.exports=routes;