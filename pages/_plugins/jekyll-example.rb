require 'htmlbeautifier'

def render_rouge(code, lang, dark = false)
  require 'rouge'

  formatter = Rouge::Formatters::HTML.new()
  lexer = Rouge::Lexer.find_fancy(lang, code) || Rouge::Lexers::PlainText

  code = HtmlBeautifier.beautify(code, indent: "\t")

  code = code.gsub(/<hide>.*?<\/hide>/, "")
  code = formatter.format(lexer.lex(code))
  code = code.strip.gsub /^[\t\s]*$\n/, ''
  code = code.gsub /\t/, "\s\s\s"
  code = code.gsub "#", "#"
  code = code.gsub "../", "./"

  "<pre>#{code}</pre>"
end

def add_code_tag(code, lang)
  code = code.sub(/<pre>\n*/, '<pre><code class="language-' + lang.to_s.gsub("+", "-") + '" data-lang="' + lang.to_s + '">')
  code = code.sub(/\n*<\/pre>/, "</code></pre>")

  code.strip
end

module Jekyll
  class ExampleBlock < Liquid::Block
    include Liquid::StandardFilters

    SYNTAX = /^([a-zA-Z0-9.+#-]+)((\s+[\w-]+(=((\w|[0-9_-])+|"(\w|[0-9_-]|\s)+"))?)*)$/

    def initialize(tag_name, markup, tokens)
      super
      if markup.strip == ""
        markup = 'html'
      end

      if markup.strip =~ SYNTAX
        @lang = $1.downcase
        @options = {}
        if defined?($2) && $2 != ''
          # Split along 3 possible forms -- key="<quoted list>", key=value, or key
          $2.scan(/(?:[\w-]+(?:=(?:(?:\w|[0-9_-])+|"[^"]*")?)?)/) do |opt|
            key, value = opt.split('=')
            # If a quoted list, convert to array
            if value && value.include?("\"")
              value.gsub!(/"/, "")
            end
            @options[key.to_sym] = value || true
          end
        end
        @options[:linenos] = false
      else
        raise SyntaxError.new <<-eos
Syntax Error in tag 'example' while parsing the following markup:

  #{markup}

Valid syntax: example <lang> [id=foo]
        eos
      end
    end

    def render(context)
      prefix = context["highlighter_prefix"] || ""
      suffix = context["highlighter_suffix"] || ""
      code = super.to_s.strip

      output = case context.registers[:site].highlighter

               when 'rouge'
                 render_rouge(code, @lang, @options[:linenos])
               end

      rendered_output = example(code) + "<div class=\"highlight\">#{add_code_tag(output, @lang)}</div>"
      prefix + rendered_output + suffix
    end

    def example(output)
      output = output.gsub(/<hide>/, "").gsub(/<\/hide>/, "")

      "<div class=\"example" + (@options[:columns] ? " example-bg" : "") + (@options[:class] ? " " + @options[:class] : "") + "\"" + (@options[:id] ? " data-example-id=\"#{@options[:id]}\"" : "") + ">\n" + (@options[:columns] ? "<div class=\"example-column example-column-" + @options[:columns] + "\">\n" : "") + (@options[:wrapper] ? "<div class=\"" + @options[:wrapper] + "\">\n" : "") + (@options[:"max-width"] ? "<div style=\"max-width: " + @options[:"max-width"] + "px; margin: 0 auto;\">\n" : "") + output + (@options[:wrapper] ? "\n</div>" : "") + (@options[:columns] ? "\n</div>" : "") + (@options[:"max-width"] ? "\n</div>" : "") + "\n</div>"
    end

  end

  module HightlightFilter
    def highlight_tidy(code, language = 'html', dark = false)
      code = render_rouge(code, language, dark)
      add_code_tag(code, language)
    end
  end
end

Liquid::Template.register_tag('example', Jekyll::ExampleBlock)
Liquid::Template.register_filter(Jekyll::HightlightFilter)
