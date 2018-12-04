<?php

abstract class Error {
    const OTHER = 0;
    const UNAUTHORIZED = 1;
    const FIELD_FORMAT = 2;
    const MISSING_PARAM = 3;
    const MISSING_CSRF = 4;
    const WRONG_CSRF = 5;
    const NOT_OWNER = 6;
    const INVALID_ROUTE = 7;
    const ALREADY_LOGGED = 8;
    const PASSWORD_NO_CONFIRMATION = 9;
    const DUPLICATED_USERNAME = 10;
    
}

?>