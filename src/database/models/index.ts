// src/database/models/index.ts
import { Sequelize } from 'sequelize';
import * as config from '../config/database'

export default new Sequelize(config)
