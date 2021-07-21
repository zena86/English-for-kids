import audioCorrect from './src/assets/sounds/correct.mp3';
import audioError from './src/assets/sounds/error.mp3';
import audioSuccess from './src/assets/sounds/success.mp3';
import audioFailure from './src/assets/sounds/failure.mp3';
import imageSuccess from './src/assets/images/successSmile.png';
import imageFailure from './src/assets/images/failureSmail.png';

export const ACTION_TOGLE_MENU = 'TOGLE_MENU';
export const ACTION_CLOSE_MENU = 'CLOSE_MENU';
export const ACTION_MODE_TO_TRAIN = 'MODE_TO_TRAIN';
export const ACTION_MODE_TO_PLAY = 'MODE_TO_PLAY';
export const ACTION_SPELL = 'ACTION_SPELL';
export const ACTION_ATTEMPT = 'ACTION_ATTEMPT';
export const ACTION_STATISTIC_SORT = 'ACTION_STATISTIC_SORT';
export const ACTION_GAME_PREPARE = 'ACTION_GAME_PREPARE';
export const ACTION_LOGIN_REQUEST = 'ACTION_LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'ACTION_LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'ACTION_LOGIN_FAILURE';

export const ACTION_LOGOUT = 'ACTION_LOGOUT';

export const PAGES_CATEGORY = 'category';
export const PAGES_STATISTIC = 'statistic';
export const PAGES_DIFFICALT_WORDS = 'difficult';
export const PAGES_MAIN = '';
export const PAGES_LOGIN = 'login';
export const PAGES_EDIT_CATEGORIES = 'edit_categories';
export const PAGES_EDIT_WORDS = 'edit_words';

export const CARDS_PER_CATEGORY = 9;
export const MAX_CARDS_PER_PAGE = 1024;

export const MODE_TRAIN = 'TRAIN';
export const MODE_PLAY = 'PLAY';

export const MAIN_PAGE = 'main page';
export const STATISTIC_PAGE = 'statistic page';
export const LOGIN_PAGE = 'admin page';

export const STATISTIC_KEY = 'STATISTIC_KEY';

export const AUDIO_CORRECT = `${audioCorrect}`;
export const AUDIO_ERROR = `${audioError}`;
export const AUDIO_SUCCESS = `${audioSuccess}`;
export const AUDIO_FAILURE = `${audioFailure}`;

export const IMAGE_SUCCESS = `${imageSuccess}`;
export const IMAGE_FAILURE = `${imageFailure}`;

export const ASC = 'ASC';
export const DESC = 'DESC';

export const TABLE_CATEGORY = 'category';
export const TABLE_RUSSIAN = 'russian';
export const TABLE_ENGLISH = 'english';
export const TABLE_ATTEMPTS = 'attempts';
export const TABLE_RIGHT = 'right';
export const TABLE_WRONG = 'wrong';
export const TABLE_PERCENT = 'percent';

export const ADMIN_STATUS_NOT_LOGINED = 'ADMIN_STATUS_NOT_LOGINED';
export const ADMIN_STATUS_LOGINED = 'ADMIN_STATUS_LOGINED';
export const ADMIN_STATUS_LOGIN_FAILURE = 'ADMIN_STATUS_LOGIN_FAILURE';
