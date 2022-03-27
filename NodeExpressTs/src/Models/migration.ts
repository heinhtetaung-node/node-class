import { sequelize } from './index';

export const migrate = async () => {
    await sequelize.sync();
}