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
      elsif value >= 60
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
      value = value.gsub(/ class="feather[^"]+"/, '')
      value = value.gsub(/<svg /, '<svg class="icon ' + class_name.to_s + '" ')
    end


    def tabler_js_color(color)
      color = color.split('-')

      if color.size == 2
        'tabler.colorVariation("'+ color[0] + '", "'+ color[1] + '")'
      else
        'tabler.colors["'+ color[0] + '"]'
      end
    end

    def replace_regex(input, reg_str, repl_str)
      re = Regexp.new reg_str

      input.gsub re, repl_str
    end
  end
end

Liquid::Template.register_filter(Jekyll::JekyllFilter)
