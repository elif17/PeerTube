// SPDX-FileCopyrightText: 2014-2022 Pierre-Yves Gosset, <pyg@framasoft.org>, et al.
//
// SPDX-License-Identifier: GPL-3.0-only

import * as Sequelize from 'sequelize'

async function up (utils: {
  transaction: Sequelize.Transaction
  queryInterface: Sequelize.QueryInterface
  sequelize: Sequelize.Sequelize
}): Promise<void> {
  await utils.queryInterface.addColumn('videoAbuse', 'predefinedReasons', {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true
  })

  await utils.queryInterface.addColumn('videoAbuse', 'startAt', {
    type: Sequelize.INTEGER,
    allowNull: true
  })

  await utils.queryInterface.addColumn('videoAbuse', 'endAt', {
    type: Sequelize.INTEGER,
    allowNull: true
  })
}

function down (options) {
  throw new Error('Not implemented.')
}

export {
  up,
  down
}
