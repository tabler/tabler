module Jekyll
  module TablerFilter

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

    def first_letter(value)
      return value[0, 1]
    end



    def mix(color_1, color_2, weight=50)
      color = "#"
      color_1 = color_1[0,1] == '#' ? color_1[1,6] : color_1
      color_2 = color_2[0,1] == '#' ? color_2[1,6] : color_2

      for i in [0, 2, 4]
        v1 = color_1[i, 2].to_i(16).to_s(10)
        v2 = color_2[i, 2].to_i(16).to_s(10)

        val = ((v2.to_i + (v1.to_i - v2.to_i) * (weight / 100.0)).round).to_s(16);

        while val.length < 2
          val = '0' + val
        end

        color += val
      end

      color
    end


    def each_slice(array, count=2)
      @size = (array.size / (count * 1.0)).ceil
      array.each_slice(@size).to_a
    end
  end
end

Liquid::Template.register_filter(Jekyll::TablerFilter)