FROM rails:5

# rails newするときのコマンド
# docker run -it --rm --user "$(id -u):$(id -g)" -v "$PWD":/usr/src/app -w /usr/src/app rails rails new --skip-bundle .

WORKDIR /app
COPY Gemfile* ./
RUN bundle install
COPY . .

EXPOSE 9292
#CMD ["rails", "server", "-b", "0.0.0.0"]
