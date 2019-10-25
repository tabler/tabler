module Jekyll

  module Tags

    class CaptureGlobal < Liquid::Block

      def initialize(tag_name, text, tokens)
        super
        @text = text.strip
      end

      def render(context)
        if $capture_global[@text] === nil
          $capture_global[@text] = '';
        end

        $capture_global[@text] += super.strip + "\n\n"

        ''
      end

    end
  end

  Jekyll::Hooks.register :site, :after_init do |page, jekyll|
    $capture_global = {}
  end

  Jekyll::Hooks.register :pages, :pre_render do |page, jekyll|
    jekyll.site['capture_global'] = $capture_global
  end

  Jekyll::Hooks.register :pages, :post_render do |page, jekyll|
    $capture_global = {}
  end
end

Liquid::Template.register_tag('capture_global', Jekyll::Tags::CaptureGlobal)
