<?php



function Error($ERR) {

    switch($ERR) {
        case 'UNAUTHORIZED':return 1;
        case 'FIELD_FORMAT':return 2;
        case 'MISSING_PARAM':return 3;
        case 'MISSING_CSRF':return 4;
        case 'WRONG_CSRF':return 5;
        case 'NOT_OWNER':return 6;
        case 'INVALID_ROUTE':return 7;
        case 'ALREADY_LOGGED':return 8;
        case 'PASSWORD_NO_CONFIRMATION':return 9;
        case 'DUPLICATED_USERNAME':return 10;
        case 'VOTE_ERROR':return 11;
        case 'CHANGE_NAME':return 12;
        case 'CHANGE_PASSWORD':return 13;
        case 'SHORT_PASSWORD':return 14;
        case 'CHANGE_BIO':return 15;
        case 'GET_BIO':return 16;
        case 'USER_NOT_FOUND':return 18;
        default: return 0;
    }
}

?>