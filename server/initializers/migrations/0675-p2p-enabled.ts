// SPDX-FileCopyrightText: 2014-2022 Pierre-Yves Gosset, <pyg@framasoft.org>, et al.
//
// SPDX-License-Identifier: GPL-3.0-only

import * as Sequelize from 'sequelize'

async function up (utils: {
  transaction: Sequelize.Transaction
  queryInterface: Sequelize.QueryInterface
  sequelize: Sequelize.Sequelize
  db: any
}): Promise<void> {
  await utils.queryInterface.renameColumn('user', 'webTorrentEnabled', 'p2pEnabled')

  await utils.sequelize.query('ALTER TABLE "user" ALTER COLUMN "p2pEnabled" DROP DEFAULT')
}

function down (options) {
  throw new Error('Not implemented.')
}

export {
  up,
  down
}
