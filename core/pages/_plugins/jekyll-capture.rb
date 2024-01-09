module Jekyll
  module Tags
    class CaptureGlobal < Liquid::Block
      def initialize(tag_name, text, tokens)
        super
        @text = text.strip
      end

      def render(context)
        unless $captured_global[@text]
          $captured_global[@text] = [];
        end

        $captured_global[@text].push(super.strip)

        ''
      end
    end
  end

  Jekyll::Hooks.register [:pages, :docs], :post_init do |page|
    $captured_global = {}
  end

  Jekyll::Hooks.register [:pages, :docs], :post_render do |page|
    $captured_global = {}
  end

  Jekyll::Hooks.register [:pages, :docs], :pre_render do |page, jekyll|
    jekyll.site['captured_global'] = $captured_global
  end
end

Liquid::Template.register_tag('capture_global', Jekyll::Tags::CaptureGlobal)

