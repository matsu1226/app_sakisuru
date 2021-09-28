# https://qiita.com/tomokazu0112/items/133fc383094b87571d88
# https://qiita.com/takano-h/items/84ae73b41eef83602bd9

FROM ruby:2.7

# 本番環境を指定(docker-compose build時はコメントアウトする)
# ENV RAILS_ENV=production

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update -qq \
    && apt-get install -y build-essential nodejs yarn default-mysql-client
WORKDIR /app
COPY . /app
RUN bundle config --local set path 'vendor/bundle' \
    && bundle install

CMD ["rails", "server", "-b", "0.0.0.0"]