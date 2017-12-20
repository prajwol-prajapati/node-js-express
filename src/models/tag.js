import bookshelf from '../db';

const TABLE_NAME = 'tags';


let Tag = bookshelf.Model.extend({
  tableName: TABLE_NAME,

  todos: function() {
    return this.belongsToMany(Todos);
  }
});

export default Tag;
