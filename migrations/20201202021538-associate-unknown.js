'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    await queryInterface.addColumn('unknown_orders', 'user_id', Sequelize.INTEGER);
    await queryInterface.addColumn('unknown_order_items', 'order_id', Sequelize.INTEGER);
    await queryInterface.addColumn('unknown_order_items', 'item_id', Sequelize.INTEGER);
    await queryInterface.addColumn('unknown_markets', 'user_id', Sequelize.INTEGER);
    await queryInterface.addColumn('unknown_markets', 'market_id', Sequelize.INTEGER);
    // foreign key 연결
    await queryInterface.addConstraint('unknown_orders', {
      fields: ['user_id'],
      type: 'foreign key',
      name: '2-1',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('unknown_order_items', {
      fields: ['order_id'],
      type: 'foreign key',
      name: '2-2',
      references: {
        table: 'user_orders',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('unknown_order_items', {
      fields: ['item_id'],
      type: 'foreign key',
      name: '2-3',
      references: {
        table: 'items',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('unknown_markets', {
      fields: ['user_id'],
      type: 'foreign key',
      name: '2-4',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('unknown_markets', {
      fields: ['market_id'],
      type: 'foreign key',
      name: '2-5',
      references: {
        table: 'markets',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // constraint 제거
    await queryInterface.removeConstraint('unknown_markets', '2-5');
    await queryInterface.removeConstraint('unknown_markets', '2-4');
    await queryInterface.removeConstraint('unknown_order_items', '2-3');
    await queryInterface.removeConstraint('unknown_order_items', '2-2');
    await queryInterface.removeConstraint('unknown_orders', '2-1');
    // field 제거
    await queryInterface.removeColumn('unknown_markets', 'market_id');
    await queryInterface.removeColumn('unknown_markets', 'user_id');
    await queryInterface.removeColumn('unknown_order_items', 'item_id');
    await queryInterface.removeColumn('unknown_order_items', 'order_id');
    await queryInterface.removeColumn('unknown_orders', 'user_id');
  }
};
