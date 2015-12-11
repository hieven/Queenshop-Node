'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const Email = sequelize.define('Email', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    memberId: {
      type: Sequelize.UUID,
      references: {
        model: 'Member',
        key: 'id'
      },
      field: 'member_id'
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    activation: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    tableName: 'emails'
  });

  return Email;
}
