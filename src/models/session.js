import bookshelf from '../db';

const TABLE_NAME = 'sessions';


let Session = bookshelf.Model.extend({
  tableName: TABLE_NAME,

});

export default Session;
