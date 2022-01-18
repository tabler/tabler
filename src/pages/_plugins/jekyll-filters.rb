require 'date'
require 'htmlbeautifier'


module Jekyll
  module JekyllFilter
    def to_pretty_time(value)
      a = (Time.now - value).to_i

      case a
      when 0 then
        'just now'
      when 1 then
        'a second ago'
      when 2..59 then
        a.to_s + ' seconds ago'
      when 60..119 then
        'a minute ago' #120 = 2 minutes
      when 120..3540 then
        (a / 60).to_i.to_s + ' minutes ago'
      when 3541..7100 then
        'an hour ago' # 3600 = 1 hour
      when 7101..82800 then
        ((a + 99) / 3600).to_i.to_s + ' hours ago'
      when 82801..172000 then
        'a day ago' # 86400 = 1 day
      when 172001..518400 then
        ((a + 800) / (60 * 60 * 24)).to_i.to_s + ' days ago'
      when 518400..1036800 then
        'a week ago'
      else
        ((a + 180000) / (60 * 60 * 24 * 7)).to_i.to_s + ' weeks ago'
      end
    end

    def format_number(value)
      value.to_s.chars.to_a.reverse.each_slice(3).map(&:join).join(",").reverse
    end

    def first_letter(value)
      value.to_s[0]
    end

    def first_letters(value)
      value.to_s.split.map(&:chr).join
    end

    def divide(value, number)
      value.to_i * 1.0 / number
    end

    def number_color(value)
      value = value.to_i

      if value >= 75
        'green'
      elsif value >= 30
        'yellow'
      else
        'red'
      end
    end

    $random_id_num = 0

    def random_id(value)
      $random_id_num += 1
    end

    def svg_icon(value, class_name)
      value = value.gsub(/<svg /, '<svg class="icon ' + class_name.to_s + '" ')
    end


    def replace_regex(input, reg_str, repl_str)
      re = Regexp.new(reg_str.to_s, Regexp::MULTILINE)

      input.gsub re, repl_str
    end

    def hex_to_rgb(color)
      r, g, b = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/).captures
      "rgb(#{r.hex}, #{g.hex}, #{b.hex})"
    end

    def concat_objects(object, object2)
      if object and object2 and object.is_a?(Hash) and object2.is_a?(Hash)
        return object.merge(object2)
      end

      object
    end

    def tabler_color(color, variation = false)
      if variation
        color = color + '-' + variation.to_s
      end

      Jekyll.sites.first.data['colors'][color]
    end

    def seconds_to_minutes(seconds)
      seconds = seconds.to_i.round

      minutes = (seconds / 60).round
      seconds = seconds - (minutes * 60)

      minutes.to_s.rjust(2, '0') + ":" + seconds.to_s.rjust(2, '0')
    end

    def miliseconds_to_minutes(miliseconds)
      seconds_to_minutes(miliseconds.to_i / 1000)
    end

    def timestamp_to_date(timestamp)
      DateTime.strptime(timestamp.to_s, '%s').strftime('%F')
    end

    def htmlbeautifier(output)
      HtmlBeautifier.beautify output
    end
  end
end

Liquid::Template.register_filter(Jekyll::JekyllFilter)
