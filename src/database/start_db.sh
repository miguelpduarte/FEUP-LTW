#!/usr/bin/env sh
rm GET.db
sqlite3 GET.db < schema.sql
sqlite3 GET.db < populate.sql