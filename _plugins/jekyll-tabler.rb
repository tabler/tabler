module Jekyll
  module TablerFilter

    def random_number(value, min=0, max=100, offset=0, round=0)
      formatter = round ? '%.' + round.to_s + 'f' : '%'
      value = formatter % ((Math.sin(Math.sin(value + offset)) + 1) * ((max - min) / 2) + min)

      value
    end

    def to_pretty_time(value)
      a = (Time.now-value).to_i

      case a
        when 0 then 'just now'
        when 1 then 'a second ago'
        when 2..59 then a.to_s+' seconds ago'
        when 60..119 then 'a minute ago' #120 = 2 minutes
        when 120..3540 then (a/60).to_i.to_s+' minutes ago'
        when 3541..7100 then 'an hour ago' # 3600 = 1 hour
        when 7101..82800 then ((a+99)/3600).to_i.to_s+' hours ago'
        when 82801..172000 then 'a day ago' # 86400 = 1 day
        when 172001..518400 then ((a+800)/(60*60*24)).to_i.to_s+' days ago'
        when 518400..1036800 then 'a week ago'
        else ((a+180000)/(60*60*24*7)).to_i.to_s+' weeks ago'
      end
    end

    def divide(value, number)
      value.to_i * 1.0 / number
    end

    def number_color(value)
      value = value.to_i

      if value >= 80
        'green'
      elsif value >= 40
        'yellow'
      else
        'red'
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::TablerFilter)