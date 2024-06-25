#!/bin/bash

# Write environment variable to /usr/share/nginx/html/config.json
#
# echo "{\"BASE_URL\": \"$BASE_URL\"}" >

echo "
{
  \"baseUrl\": \"$BASE_URL\"
}
" > /usr/share/nginx/html/config.json


# Start nginx
#
nginx -g 'daemon off;'
