<?php

abstract class Error {
    const OTHER = 0;
    const UNAUTHORIZED = 1;
    const STRING_FORMAT = 2;
    const MISSING_PARAM = 3;
    const MISSING_CSRF = 4;
    const WRONG_CSRF = 5;
    const NOT_OWNER = 6;
    const INVALID_ROUTE = 7;
    const ALREADY_LOGGED = 8;
}

?>