const userSQL = {
  addUserInfo: 'INSERT INTO f_name(name) VALUES(?)',
  delUserInfo: 'DELETE FROM f_name WHERE id = ? ',
  setUserInfo: 'UPDATE f_name SET name = ? WHERE id = ?',
  getUserInfo: 'SELECT * FROM f_name',
  addUserImgById: 'UPDATE f_name SET head_img = ? WHERE id = ?',
  addWorkInfo: 'INSERT INTO f_works(work) VALUES(?)',
  delWorkInfo: 'DELETE FROM f_works WHERE id = ?',
  getWorkInfo: 'SELECT * FROM f_works',
  setWorkInfo: 'UPDATE f_works SET work = ? WHERE id = ?',
  getAllInfo: 'select f_name.name,f_name.head_img,f_works.work from f_task left join f_name on f_task.name = f_name.id left join f_works on f_task.work = f_works.id order by f_name.id',
  addTask: 'INSERT INTO f_task(name,work) VALUES(?,?)',
  delTaskByWork: 'DELETE FROM f_task WHERE work = ?',
  delTaskByName: 'DELETE FROM f_task WHERE name = ?',
  setTask: 'UPDATE f_task SET name = ? WHERE work = ?',
  getTask: 'SELECT * FROM f_task',
}

module.exports = userSQL;
