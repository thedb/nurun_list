const express = require('express');
const router = express.Router();
// const URL = require('url');
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const userSQL = require('./userSQL');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const pool = mysql.createPool(dbConfig.mysql);
const responseJSON = (res,ret) => {
  typeof ret === 'undefined' ? res.json({code:'-200',msg:'error'}) : res.json(ret);
}

router.post('/', function(req, res, next) {
  let param = req.body || req.query || req.params;
  // console.log(param);

  /*sql接口*/
  pool.getConnection((err, connection) => {
    console.log(err);
    /*图片接口*/
    if(param.action == 'submit_Img'){
    	//过滤data:URL
    	let base64Data = param.img.replace(/^data:image\/\w+;base64,/, "");
    	let dataBuffer = new Buffer(base64Data, 'base64');
      let url = '/images/'+ uuidv4() +'.png';
    	fs.writeFile('public' + url, dataBuffer, function(err) {
    		if(err){
    		  res.send(err);
    		}else{
          connection.query(userSQL.addUserImgById,[url,param.id],(err,result) => {
            console.log(result)
            if(err){
              res.send(err)
            }else{
              let response = {
                result: '1',
              }
              responseJSON(res,response)
            }
          });
    		}
    	});
    }

    /*接口：
      查询员工工作信息
    */
    if(param.action == 'find_all'){
      let all,name;
      let a = new Promise((resolve,reject) => {
          console.log(err);
          connection.query(userSQL.getAllInfo,null,(err,result1) => {
          // console.log(result);
            result1 = result1.map(function(item,index,arr){
              const i = result1.find(_item => item.name === _item.name);
              if(i !== item){
                i.work.push(item.work);
                return undefined;
              }else{
                i.work = [i.work];
                return i;
              }
            }).filter(item => item !== undefined);
            all = [].slice.call(result1)
            resolve()
          });
      })
      let b = new Promise((resolve,reject) => {
          connection.query(userSQL.getUserInfo,null,(err,result2) => {
            // console.log(result2);
            name = [].slice.call(result2)
            resolve()
          });
      })
      Promise.all([a, b]).then(() => {
        let noJob = name.map((val) => {
          return val.name
        }).filter((key) => {
          return !all.map((val) => {
            return val.name
          }).includes(key)
        })
        let response = {
          result: '1',
          data: all,
          other: noJob
        }
        responseJSON(res,response)
      })
    }
    /*接口：
      修改员工工作信息
    */
    if(param.action == 'set_task'){
      connection.query(userSQL.getTask,null,(err,result) => {
        console.log(result);
        let a = result.some((val) => {
          return parseInt(val.work) === parseInt(param.work)
        })
        console.log(a);
        if(a){
          connection.query(userSQL.setTask,[pool.escape(parseInt(param.name)),pool.escape(parseInt(param.work))],(err,result) => {
            // console.log(err);
            // console.log(result);
            var response = {
              result: '1',
              data: result
            }
            responseJSON(res,response)
          });
        }else{
          connection.query(userSQL.addTask,[pool.escape(parseInt(param.name)),pool.escape(parseInt(param.work))],(err,result) => {
            // console.log(err);
            // console.log(result);
            var response = {
              result: '1',
              data: result
            }
            responseJSON(res,response)
          });
        }
      });
    }

    /*接口：
      新增工作信息
    */
    if(param.action == 'add_work'){
      connection.query(userSQL.addWorkInfo,[param.work],(err,result) => {
        // console.log(result);
        var response = {
          result: '1',
          data: result
        }
        responseJSON(res,response)
      });
    }

    /*接口：
      删除工作信息
    */
    if(param.action == 'delete_work'){
      let a = new Promise((resolve,reject) => {
        connection.query(userSQL.delTaskByWork,[parseInt(param.id)],(err,result) => {
          // console.log(result);
          resolve()
        });
      })
      let b = new Promise((resolve,reject) => {
        connection.query(userSQL.delWorkInfo,[parseInt(param.id)],(err,result) => {
          // console.log(result);
          resolve()
        });
      })
      Promise.all([a,b]).then(() => {
        var response = {
          result: '1'
        }
        responseJSON(res,response)
      }).catch(e => {
        console.log(e)
      })
    }
    /*接口：
      修改工作信息
    */
    if(param.action == 'set_work'){
      connection.query(userSQL.setWorkInfo,[param.work,param.id],(err,result) => {
        // console.log(result);
        var response = {
          result: '1',
          data: result
        }
        responseJSON(res,response)
      });
    }

    /*接口：
    查询工作信息
    */
    if(param.action == 'find_work'){
      connection.query(userSQL.getWorkInfo,null,(err,result) => {
        // console.log(result);
        var response = {
          result: '1',
          data: result
        }
        responseJSON(res,response)
      });
    }
    /*接口：
      新增员工信息
    */
    if(param.action == 'add_name'){
      connection.query(userSQL.addUserInfo,[param.name],(err,result) => {
        // console.log(result);
        var response = {
          result: '1',
          data: result
        }
        responseJSON(res,response)
      });
    }

    /*接口：
      删除员工信息
    */
    if(param.action == 'delete_name'){
      let a = new Promise((resolve,reject) => {
        connection.query(userSQL.delTaskByName,[parseInt(param.id)],(err,result) => {
          // console.log(result);
          resolve()
        });
      })
      let b = new Promise((resolve,reject) => {
        connection.query(userSQL.delUserInfo,[parseInt(param.id)],(err,result) => {
          // console.log(result);
          resolve()
        });
      })
      Promise.all([a,b]).then(() => {
        var response = {
          result: '1'
        }
        responseJSON(res,response)
      }).catch(e => {
        console.log(e)
      })
    }

    /*接口：
      修改员工信息
    */
    if(param.action == 'set_name'){
      connection.query(userSQL.setUserInfo,[param.name,param.id],(err,result) => {
        // console.log(result);
        var response = {
          result: '1',
          data: result
        }
        responseJSON(res,response)
      });
    }

    /*接口：
      查询员工信息
    */
    if(param.action == 'find_name'){
        connection.query(userSQL.getUserInfo,null,(err,result) => {
          // console.log(result);
          var response = {
            result: '1',
            data: result
          }
          responseJSON(res,response)
        });
    }
    /*接口：
      上传图片信息
    */
    if(param.action == 'upload_img'){

    }
    connection.release();
  })
});

module.exports = router;
