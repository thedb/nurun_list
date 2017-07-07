const userSQL = {
  insert: 'INSERT INTO front_list(name,work) VALUES(?,?)',
  queryALL: 'SELECT * FROM front_list',
  getWorkByName: 'SELECT * FROM front_list WHERE name = ?',
  getWorkInfo: 'SELECT work FROM front_works',
  getAllInfo: 'select front_name.name,front_works.work from front_task left join front_name on front_task.name = front_name.id left join front_works on front_task.work = front_works.id order by front_name.id',
}

module.exports = userSQL;