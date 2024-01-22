module Jekyll
  class NodeModulesTag < Liquid::Tag
    def initialize(tag, markup, tokens)
      super

      @file = File.join('node_modules', markup.strip)
    end

    def render(context)
      File.read @file
    end
  end
end

Liquid::Template.register_tag('node_module', Jekyll::NodeModulesTag)
