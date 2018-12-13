DOCROOT="src"
ROUTER="server/router.php"
HOST=localhost
PORT=8080

PHP=$(which php)
if [ $? != 0 ] ; then
    echo "Unable to find PHP"
    exit 1
fi

$PHP -S $HOST:$PORT -t $DOCROOT $ROUTER