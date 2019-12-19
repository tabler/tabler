module Jekyll
  module Tags
    class CaptureGlobal < Liquid::Block
      def initialize(tag_name, text, tokens)
        super
        @text = text.strip
      end

      def render(context)
        if $captured_global[@text] === nil
          $captured_global[@text] = '';
        end

        $captured_global[@text] += super.strip + "\n\n"

        ''
      end
    end

    class CaptureScripts < Liquid::Tag
      def initialize(tag_name, text, tokens)
        super
        @text = text.strip
      end

      def render(context)
        unless $captured_libs.include? @text
          $captured_libs.push(@text)
        end

        ''
      end
    end
  end

  Jekyll::Hooks.register :site, :after_init do |page, jekyll|
    $captured_global = {}
    $captured_libs = []
  end

  Jekyll::Hooks.register :pages, :pre_render do |page, jekyll|
    jekyll.site['captured_global'] = $captured_global
    jekyll.site['captured_libs'] = $captured_libs
  end

  Jekyll::Hooks.register :pages, :post_render do |page, jekyll|
    $captured_global = {}
    $captured_libs = []
  end
end

Liquid::Template.register_tag('capture_global', Jekyll::Tags::CaptureGlobal)
Liquid::Template.register_tag('append_lib', Jekyll::Tags::CaptureScripts)

