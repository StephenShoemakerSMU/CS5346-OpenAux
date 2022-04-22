FROM debian:latest

#Install everything
RUN apt-get update -qq -y && apt-get install -qq icecast2 -y

#Cleanup
RUN apt-get clean && apt-get autoremove

#Configure icecast
COPY $PWD/config/* /etc/icecast2/
WORKDIR /etc/icecast2/
RUN chown root:icecast icecast.xml \
	&& chown root:icecast run.sh \
	&& chmod +x run.sh
EXPOSE 8000

CMD /etc/icecast2/run.sh
