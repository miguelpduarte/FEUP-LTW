#!/bin/sh

sed -i.bak 's/BASE_DIR_PLACEHOLDER/\/'$1'/g' ./src/.htaccess
sed -i.bak 's/BASE_DIR_PLACEHOLDER/\/'$1'/g' ./src/js/components/Navbar.js
sed -i.bak 's/BASE_DIR_PLACEHOLDER/\/'$1'/g' ./src/templates/common.php