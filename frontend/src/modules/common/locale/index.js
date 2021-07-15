import error404En from './en/error404';
import error404Ja from './ja/error404';
import error403En from './en/error403';
import error403Ja from './ja/error403';
import error500En from './en/error500';
import error500Ja from './ja/error500';
import commonEn from './en/common';
import commonJa from './ja/common';

export default {
    en: {
        error404: error404En,
        error403: error403En,
        error500: error500En,
        ...commonEn,
    },
    ja: {
        error404: error404Ja,
        error403: error403Ja,
        error500: error500Ja,
        ...commonJa,
    },
};
