#!/bin/sh

sed -i.bak 's/BASE_DIR_PLACEHOLDER/\/'$1'/g' ./.htaccess
sed -i.bak 's/BASE_DIR_PLACEHOLDER/\/'$1'/g' ./js/components/Navbar.js
sed -i.bak 's/BASE_DIR_PLACEHOLDER/\/'$1'/g' ./templates/common.php