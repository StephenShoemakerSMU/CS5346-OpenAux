#!/bin/bash

if [ -n "$ICECAST_SOURCE_PASS" ]; then
    sed -i "s/<source-password>[^<]*<\/source-password>/<source-password>$ICECAST_SOURCE_PASS<\/source-password>/g" /etc/icecast2/icecast.xml
else
	echo "ERROR: No source password received"
fi

if [ -n "$ICECAST_RELAY_PASS" ]; then
    sed -i "s/<relay-password>[^<]*<\/relay-password>/<relay-password>$ICECAST_RELAY_PASS<\/relay-password>/g" /etc/icecast2/icecast.xml
else
	echo "ERROR: No relay password received"
fi

if [ -n "$ICECAST_ADMIN_PASS" ]; then
    sed -i "s/<admin-password>[^<]*<\/admin-password>/<admin-password>$ICECAST_ADMIN_PASS<\/admin-password>/g" /etc/icecast2/icecast.xml
else
	echo "ERROR: No admin password received"
fi

/etc/init.d/icecast2 start && tail -F /var/log/icecast2/access.log
