import bookshelf from '../db';

const TABLE_NAME = 'users';

/**
 * User model.
 */
let User = bookshelf.Model.extend({
  tableName: TABLE_NAME,

  todos: function() {
    return this.hasMany(Todos);
  }

});

export default User;
