'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const Member = sequelize.define('Member', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updated_at'
    },
    deletedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
      field: 'deleted_at'
    }
  }, {
    tableName: 'members'
  });

  return Member;
}
