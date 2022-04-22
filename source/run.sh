#!/bin/bash

if [ -n "$ICECAST_SOURCE_PASS" ]; then
    sed -i "s/\$ICECAST_SOURCE_PASS/$ICECAST_SOURCE_PASS/g" /etc/liquidsoap/script.liq
else
	echo "ERROR: Source password not found"
fi

if [ -n "$ICECAST_HOST" ]; then
	sed -i "s/\$ICECAST_HOST/$ICECAST_HOST/g" /etc/liquidsoap/script.liq
else
	echo "ERROR: Icecast server address not found"
fi

eval $(opam env)
nohup liquidsoap /etc/liquidsoap/script.liq &
node /etc/express
