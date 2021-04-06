const db=require("../controller/query");
const jwt=require("jsonwebtoken");
const dotenv = require('dotenv');
const result = dotenv.config();
module.exports={
    check_token: async (req, res, next) => {
        try {
            let token = req.body.token;
            let id = req.body.id;
            if (!req.body.token) {
                res.status(400).json({
                    message: 'thieu token',
                })
            }
            if (!req.body.id) {
                res.status(400).json({
                    message: 'thieu id',
                })
            }

    
            jwt.verify(token,process.env.JWT_KEY, (err, result) => {
                if (err) {
                    res.json({
                        err: err.message,
                        message: "token khong hop le :)"
                    })
                    return;
                } else {
                    next();
                }
            });

        } catch (error) {
            return res.json({
                message: "hacker a"
            })
        }
    },
    // sẽ có một hàm check token để check đăng nhập đối với tất cả các api trừ api đăng ký
    reg: async (req,res)=>{
       try {
            const {username,password,password_again,fullname,birthday}=req.body;

            if(password==password_again){
                let sql=`insert into account (username,password,fullname,birthday) values ('${username}','${password}','${fullname}','${birthday}')`;
                let _insert=await db._query(sql);
                if(_insert){
                    res.status(200).json({
                        message:"reg successfully"
                    })
                }else{
                    res.status(400).json({
                        message:"reg failed"
                    })
                }
            }
       } catch (error) {
           res.status(500).json({
               message:error.message
           })
       }
    },
    login: async(req,res)=>{
        try {
            const{username,password}=req.body;

            let sql=`select username,password,id from account where username='${username}' and password=${password}`;
            let check=await db._query(sql);

            if(check[0].username==username && check[0].password==password){
                let token = jwt.sign({
                    username: username,
                    id: check[0].id
                },process.env.JWT_KEY);
                
                res.status(200).json({
                    message:"login sucessfully",
                    id:check[0].id,
                    token:token
                })
            }else{
                res.status(400).json({
                    message:"login failed"
                })
            }
        } catch (error) {
            res.status(500).json({
                message:error.message,
                stt:"hacker"
            })
        }
    },
    information: async(req,res)=>{
        try {
            const {id,token}=req.body;
        
            let sql=`select * from account where id=${id}`;
            let information=await db._query(sql);
            res.status(200).json({
                message:"get information successfully",
                data:information
            })
        } catch (error) {
            res.status(500).json({
                message:error.message
            })
        }
    },
    //-------------work----------------
    post_work: async(req,res)=>{
        try {
            const{content,id}=req.body;
            let sql=`insert into works (content,id_account) values ('${content}',${id})`;
            let _insert=await db._query(sql);
            if(_insert){
                res.status(200).json({
                    message:"post work successfully",
                    data: _insert
                })
            }else{
                res.status(400).json({
                    message:"post work failed",
                })
            }
        } catch (error) {
            res.status(500).json({
                message:error.message
            })
        }

    },
    delete_work: async(req,res)=>{
        try {
            const{id_work}=req.body;
            let sql=`DELETE FROM works WHERE id = ${id_work}`;
            let _delete=await db._query(sql);
            if(_delete){
                res.status(200).json({
                    message:"_delete work successfully",
                    data: _delete
                })
            }else{
                res.status(400).json({
                    message:"_delete work failed",
                })
            }
        } catch (error) {
            res.status(500).json({
                message:error.message
            })
        }
    },
    //----------------------ground-----------------------------
    create_group: async (req,res)=>{
       try {
            let {id,name,password_ground}=req.body;

            // tạo ground
            let sql=`insert into ground (name,password_ground) values ('${name}',${password_ground})`;
            let create_ground=await db._query(sql);

            //get id ground
            let sql2=`select id from ground where name='${name}' and password_ground=${password_ground}`;
            let getIdGround= await db._query(sql2);

            // thêm người dùng đó vào nhóm đó vào bảng member_ground
            let sql3=`insert into member_ground (id_ground,id_account) values (${getIdGround[0].id},${id})` ;
            let _insert_ground=await db._query(sql3);


            if(create_ground && getIdGround && _insert_ground){
                res.status(200).json({
                    message:"create ground successfully"
                })
            }else{
                res.status(400).json({
                    message:"create ground failed"
                })
            }
       } catch (error) {
            res.status(500).json({
                message:error.message
            })
       }
    },
    post_work_group: async (req,res)=>{
        let {id_group,content}=req.body;

        let sql=`insert into work_ground (id_ground,content) values (${id_group},'${content}')`;
        // res.json(sql)
        let _insert=await db._query(sql);
        if(_insert){
            res.status(200).json({
                message:"add data successfully"
            })
        }else{
            res.status(400).json({
                message:"add data failed"
            })
        }
    },
    reg_member_group: async (req,res)=>{
        try {
            let{id,id_group,password_group}=req.body;

            let sql=`select * from ground where id=${id_group} and password_ground=${password_group}`;
            let check=await db._query(sql);

            if(check[0].id==id_group){
                let sql2=`insert into member_ground (id_ground, id_account) values (${id_group},${id})`;
                let _insert= await db._query(sql2);
                if(_insert){
                    res.status(200).json({
                        message:"đăng ký thành viên group thành công"
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                message:error.message
            })
        }
    },
    //get công việc của nhóm
    work_group: async (req,res)=>{
       try {
            let {id_group}=req.body;

            let sql=`select content from work_ground where id_ground=${id_group}`;
            let _get= await db._query(sql);

            res.status(200).json({
                message:"get data successfully",
                data:_get
            })
       } catch (error) {
            res.status(500).json({
                message:error.message
            })
       }
    },
    // get thông tin các nhóm mà user đó tham gia
    group_user: async(req,res)=>{
       try {
            let {id}=req.body;
                let sql=`SELECT ground.name, ground.id FROM ground, member_ground WHERE ground.id = member_ground.id_ground AND member_ground.id_account = ${id}`;
                let data= await db._query(sql);
                res.status(200).json({
                    message:"get data group user successfully",
                    data:data
                })
          
       } catch (error) {
            res.status(500).json({
                message:error.message
            })
       }
    },
    // get các công việc user và group
    get_content_user: async(req,res)=>{
        try {
            let id_account=req.body.id_account;
            // get các công việc ở bảng works
            let sql=`SELECT content,id from works where id_account=${id_account}`;
            let _get_works= await db._query(sql);

            // get các công việc ở bảng work_group;
            let sql1=`SELECT work_ground.content FROM member_ground, work_ground WHERE work_ground.id_ground = member_ground.id_ground AND member_ground.id_account = ${id_account}`;
            let _get_work_group=await db._query(sql1);
            
            let arr_work=[];
            arr_work.push(_get_works);
            arr_work.push(_get_work_group);

            res.status(200).json({
                message:"get data work successfully",
                data: arr_work
            })
            
        } catch (error) {
            res.status(500).json({
                message:error.message
            })
        }
    },
    get_information_group: async (req,res)=>{
       try {
            let id_group=req.body.id_group;

            let sql=`select name,password_ground from ground where id=${id_group}`;
            let data=await db._query(sql);

            res.status(200).json({
                message:"get data group sucessfully",
                data: data,
            })
       } catch (error) {
            res.status(500).json({
                message:error.message
            })
       }
    }

    
}