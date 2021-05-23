#!/bin/bash

docker exec -it fale_mais psql -U matheus -c "CREATE DATABASE fale_mais;"

docker exec -it fale_mais psql -U matheus -c "CREATE DATABASE fale_mais_teste;"