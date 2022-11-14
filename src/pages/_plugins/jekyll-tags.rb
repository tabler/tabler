require 'pathname'


module Jekyll
  module Tags
    class Hide < Liquid::Block

      def initialize(tag_name, text, tokens)
        super
        @text = text
      end

      def render(context)
        '{% hide %}' + super.to_s + '{% endhide %}'
      end
    end

    class RemoveEmptyLines < Liquid::Block

      def initialize(tag_name, text, tokens)
        super
        @text = text
      end

      def render(context)
        super.strip.gsub /^[\t\s]*$\n/, ''
      end
    end

    class DocsUrl < Liquid::Tag
      def initialize(tag_name, path, tokens)
        super
        @path = path.strip
      end

      def render(context)
        url = context.environments.first.page.url.sub!(/^\//, '')
        pageDir = Pathname(url).parent

        ('./' + Pathname('docs/' + @path + '.html').relative_path_from(pageDir).to_s).gsub(/^\.\/\.\./, "..")
      end
    end
  end
end

Liquid::Template.register_tag('removeemptylines', Jekyll::Tags::RemoveEmptyLines)
Liquid::Template.register_tag('docs_url', Jekyll::Tags::DocsUrl)
Liquid::Template.register_tag('hide', Jekyll::Tags::Hide)

