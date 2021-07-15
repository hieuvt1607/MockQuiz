import devConfig from './dev.config';
import prodConfig from './prod.config';

const config = `${process.env.VUE_APP_ENVIRONMENT}` === 'production' ? prodConfig : devConfig;
export default config;
