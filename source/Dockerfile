FROM debian:latest

#Install everything
RUN apt-get update -qq -y && \
	apt-get install -y -qq \
		nodejs \
		npm \
    	opam \
    	gcc \
    	libmad0-dev \
    	libmp3lame-dev \
    	libogg-dev \
    	libpcre3-dev \
    	libsamplerate0-dev \
    	libtag1-dev \
    	libvorbis-dev \
		libcurl4-gnutls-dev \
    	m4 \
    	make \
    	pkg-config \
    	zlib1g-dev

#Cleanup
RUN apt-get autoremove && apt-get clean && rm -rf /var/lib/apt/lists/*

#Configure Express API
COPY $PWD/express /etc/express/
WORKDIR /etc/express/
RUN npm install /etc/express/
EXPOSE 3000

#Add user for liquidsoap
RUN groupadd -g 999 radio && \
    useradd -m -r -u 999 -g radio radio && \
    mkdir /etc/liquidsoap && \
	chown -R radio /etc/liquidsoap && \
	chown -R radio /etc/express
COPY $PWD/run.sh /etc/run.sh
RUN chown -R radio /etc/run.sh && chmod +x /etc/run.sh
RUN touch /var/log/liquidsoap.log && chown -R radio /var/log/liquidsoap.log

USER radio

#Install and configure liquidsoap
ARG OPAM_PACKAGES="taglib mad lame vorbis cry samplerate ocurl liquidsoap"
RUN opam init -a -y --disable-sandboxing && eval $(opam env) && opam install -y depext
RUN opam install -y ${OPAM_PACKAGES} && opam install -y ${OPAM_PACKAGES} && eval $(opam env)
RUN opam clean -acryv --logs --unused-repositories
COPY $PWD/liquidsoap/* /etc/liquidsoap/

CMD /etc/run.sh
