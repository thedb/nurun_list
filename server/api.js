const express = require('express');
const router = express.Router();
// const URL = require('url');
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const userSQL = require('./userSQL');

const pool = mysql.createPool(dbConfig.mysql);
const responseJSON = (res,ret) => {
  typeof ret === 'undefined' ? res.json({code:'-200',msg:'error'}) : res.json(ret);
}

router.post('/', function(req, res, next) {
  let param = req.body || req.query || req.params;
  console.log(param)
  pool.getConnection((err, connection) => {
    console.log(err);
    /*
      接口：增加员工????
    */
    if(param.action == 'addUsers'){
      connection.query(userSQL.insert,[param.name,param.work],(err,result) => {
        if(result){
          var response = {
            result: '1',
            msg: '增加成功'
          }
        }
        responseJSON(res,response)
      });
    }

    /*接口：
      查询员工工作信息
    */
    if(param.action == 'find_all'){
      connection.query(userSQL.getAllInfo,null,(err,result) => {
        console.log(result);
        result = result.map(function(item,index,arr){
            const i = result.find(_item => item.name === _item.name);
            if(i !== item){
              i.work.push(item.work);
              return undefined;
            }else{
              i.work = [i.work];
              return i;
            }
        }).filter(item => item!==undefined);
        var response = {
          result: '1',
          data: result
        }
        responseJSON(res,response)
      });
    }

    /*接口：
      修改员工工作信息
    */
    if(param.action == 'set_task'){
      connection.query(userSQL.setTask,[parseInt(param.name),parseInt(param.work)],(err,result) => {
        // console.log(err);
        console.log(result);
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
        console.log(result);
        var response = {
          result: '1',
          data: result
        }
        responseJSON(res,response)
      });
    }

    /*接口：
      修改工作信息
    */
    if(param.action == 'set_work'){
      connection.query(userSQL.setWorkInfo,[param.work,param.id],(err,result) => {
        console.log(result);
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
        console.log(result);
        var response = {
          result: '1',
          data: result
        }
        responseJSON(res,response)
      });
    }

    /*接口：
      修改员工信息
    */
    if(param.action == 'set_name'){
      connection.query(userSQL.setUserInfo,[param.name,param.id],(err,result) => {
        console.log(result);
        var response = {
          result: '1',
          data: result
        }
        responseJSON(res,response)
      });
    }
    connection.release();
  })
});

module.exports = router;
