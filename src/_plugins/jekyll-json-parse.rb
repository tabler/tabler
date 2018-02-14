require 'json'

module JsonFilter
  def json_parse(input)
    JSON.parse(input)
  end

  Liquid::Template.register_filter self
end