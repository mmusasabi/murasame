FROM fluent/fluentd:v0.12.36

RUN apk update && apk add ruby-dev make gcc g++ zlib-dev xz-dev

RUN ["gem", "install", "fluent-plugin-forest", "--no-rdoc", "--no-ri"]
RUN ["gem", "install", "fluent-plugin-mongo", "-v", "0.8.1", "--no-rdoc", "--no-ri"]
