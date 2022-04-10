FROM ubuntu:latest

#docker run -p8000:8000 --device=/dev/snd:/dev/snd icecast

#TODO
#Update init script to start IceS as well as icecast
#Express API

#Install icecast
RUN apt update -qq -y && apt install -qq icecast2 ices2 mpg123 -y
COPY $PWD/icecast/* /etc/icecast2
RUN chown root:icecast /etc/icecast2/icecast.xml
EXPOSE 8000

#Install IceS (icecast source client)
RUN mkdir /etc/ices && mkdir /var/log/ices
COPY $PWD/ices/* /etc/ices/

#Set up Express API
RUN apt install -qq nodejs npm -y && mkdir /etc/express && mkdir /var/cache/streamer
COPY $PWD/express /etc/express/
WORKDIR /etc/express
RUN npm install /etc/express
EXPOSE 3000

#CMD /etc/init.d/icecast2 start && ices2 /etc/ices/ices.xml && node /etc/express
CMD node /etc/express
