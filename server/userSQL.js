const userSQL = {
  insert: 'INSERT INTO f_list(name,work) VALUES(?,?)',
  queryALL: 'SELECT * FROM f_list',
  getUserInfo: 'SELECT * FROM f_name',
  setUserInfo: 'UPDATE f_name SET name = ? WHERE id = ?',
  getWorkInfo: 'SELECT * FROM f_works',
  setWorkInfo: 'UPDATE f_works SET work = ? WHERE id = ?',
  getAllInfo: 'select f_name.name,f_works.work from f_task left join f_name on f_task.name = f_name.id left join f_works on f_task.work = f_works.id order by f_name.id',
  setTask: 'UPDATE f_task SET name = ? WHERE work = ?',
}

module.exports = userSQL;
