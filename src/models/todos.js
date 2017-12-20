import bookshelf from '../db';

const TABLE_NAME = 'todos';


let Todos = bookshelf.Model.extend({
  tableName: TABLE_NAME,

  user: function() {
    return this.belongsTo(User);
  },

  tag: function() {
    return this.belongsTo(Tag);
  }
});

export default Todos;
