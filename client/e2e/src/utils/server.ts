import { exec, spawn } from 'child_process'
import { join, resolve } from 'path'

function runServer (appInstance: string, config: any = {}) {
  const env = Object.create(process.env)
  env['NODE_ENV'] = 'test'
  env['NODE_APP_INSTANCE'] = appInstance

  env['NODE_CONFIG'] = JSON.stringify({
    rates_limit: {
      api: {
        max: 5000
      },
      login: {
        max: 5000
      }
    },
    log: {
      level: 'warn'
    },
    signup: {
      enabled: false
    },
    transcoding: {
      enabled: false
    },
    video_studio: {
      enabled: false
    },

    ...config
  })

  const forkOptions = {
    env,
    cwd: getRootCWD(),
    detached: false
  }

  const p = spawn('node', [ join('dist', 'server.js') ], forkOptions)
  p.stderr.on('data', data => console.error(data.toString()))
  p.stdout.on('data', data => console.error(data.toString()))

  return p
}

function runCommand (command: string) {
  return new Promise<void>((res, rej) => {
    const p = exec(command, { cwd: getRootCWD() })

    p.stderr.on('data', data => console.error(data.toString()))
    p.on('error', err => rej(err))
    p.on('exit', () => res())
  })
}

export {
  runServer,
  runCommand
}

// ---------------------------------------------------------------------------

function getRootCWD () {
  return resolve('../..')
}
