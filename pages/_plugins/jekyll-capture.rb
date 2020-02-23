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

    class CaptureOnce < Liquid::Block
      def initialize(tag_name, text, tokens)
        super
        @text = text.strip
      end

      def render(context)
        if $captured_once[@text] === nil
          $captured_once[@text] = [];
        end

        data = super.strip

        unless $captured_once[@text].include?(data)
          $captured_once[@text].push(data);
        end

        ''
      end
    end
  end

  Jekyll::Hooks.register [:pages, :docs], :post_init do |page|
    $captured_global = {}
    $captured_once = {}
    $captured_libs = []
  end

  Jekyll::Hooks.register [:pages, :docs], :post_render do |page|
    $captured_global = {}
    $captured_once = {}
    $captured_libs = []
  end

  Jekyll::Hooks.register [:pages, :docs], :pre_render do |page, jekyll|
    jekyll.site['captured_global'] = $captured_global
    jekyll.site['captured_once'] = $captured_once
    jekyll.site['captured_libs'] = $captured_libs
  end
end

Liquid::Template.register_tag('capture_global', Jekyll::Tags::CaptureGlobal)
Liquid::Template.register_tag('capture_once', Jekyll::Tags::CaptureOnce)
Liquid::Template.register_tag('append_lib', Jekyll::Tags::CaptureScripts)

