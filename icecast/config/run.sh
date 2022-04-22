#!/bin/bash

if [ -n "$ICECAST_SOURCE_PASS" ]; then
	echo "Source password confirmed"
    sed -i "s/<source-password>[^<]*<\/source-password>/<source-password>$ICECAST_SOURCE_PASS<\/source-password>/g" /etc/icecast2/icecast.xml
fi
if [ -n "$ICECAST_RELAY_PASS" ]; then
	echo "Relay password confirmed"
    sed -i "s/<relay-password>[^<]*<\/relay-password>/<relay-password>$ICECAST_RELAY_PASS<\/relay-password>/g" /etc/icecast2/icecast.xml
fi
if [ -n "$ICECAST_ADMIN_PASS" ]; then
	echo "Admin password confirmed"
    sed -i "s/<admin-password>[^<]*<\/admin-password>/<admin-password>$ICECAST_ADMIN_PASS<\/admin-password>/g" /etc/icecast2/icecast.xml
fi

/etc/init.d/icecast2 start && tail -F /var/log/icecast2/access.log
