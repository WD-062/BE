import User from '../models/User.js';
import Post from '../models/Post.js';
import sequelize from './index.js';

User.hasMany(Post, {
  foreignKey: {
    allowNull: false,
    name: 'userId'
  }
});
Post.belongsTo(User, { foreignKey: { allowNull: false, name: 'userId' }, onDelete: 'CASCADE' });

sequelize.sync();
