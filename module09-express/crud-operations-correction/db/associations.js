import User from '../models/User.js';
import Note from '../models/Note.js';
import sequelize from './index.js';

User.hasMany(Note);
Note.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});

sequelize.sync();
