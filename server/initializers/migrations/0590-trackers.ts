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
  {
    const query = `CREATE TABLE IF NOT EXISTS "tracker" (
      "id" serial,
      "url" varchar(255) NOT NULL,
      "createdAt" timestamp WITH time zone NOT NULL,
      "updatedAt" timestamp WITH time zone NOT NULL,
      PRIMARY KEY ("id")
    );`

    await utils.sequelize.query(query)
  }

  {
    const query = `CREATE TABLE IF NOT EXISTS "videoTracker" (
      "videoId" integer REFERENCES "video" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
      "trackerId" integer REFERENCES "tracker" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
      "createdAt" timestamp WITH time zone NOT NULL,
      "updatedAt" timestamp WITH time zone NOT NULL,
      UNIQUE ("videoId", "trackerId"),
      PRIMARY KEY ("videoId", "trackerId")
    );`

    await utils.sequelize.query(query)
  }

  await utils.sequelize.query(`CREATE UNIQUE INDEX "tracker_url" ON "tracker" ("url")`)
}

function down (options) {
  throw new Error('Not implemented.')
}

export {
  up,
  down
}
