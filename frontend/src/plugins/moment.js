import moment from 'moment';
import TokenService from '@/helpers/token';

const lang = TokenService.getLang() || 'ja';

moment.locale(lang);
