import 'dotenv/config'

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 3000
const LOG_DIR = process.env.LOG_DIR || './logs'

export { NODE_ENV, PORT, LOG_DIR }
