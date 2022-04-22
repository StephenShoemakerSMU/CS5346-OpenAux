#!/usr/bin/liquidsoap

#Set log file path
log.file.path.set("/var/log/liquidsoap.log")

#Setup telnet server for requests
settings.server.telnet.set(true)
settings.server.telnet.port.set(4000)
settings.server.telnet.bind_addr.set("127.0.0.1")
settings.server.log.level.set(3)

default = single("/etc/liquidsoap/idle.ogg")
radio = fallback(request.queue(), default)

output.icecast(%vorbis, host = "localhost", port = 8000, password = "dontPutThisOnGithub", mount = "stream.ogg", radio)
