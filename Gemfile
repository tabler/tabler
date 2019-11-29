# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

gem "jekyll", "~> 4.0"

group :jekyll_plugins do
  gem "jekyll-random"
  gem "jekyll-tidy"
  gem "jekyll-timeago"
  gem 'jekyll-redirect-from'
  gem 'jekyll-include-cache'
end

gem 'wdm', '>= 0.1.1' if Gem.win_platform?
