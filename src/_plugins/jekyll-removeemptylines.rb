module Jekyll
  class RemoveEmptyLines < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      super.strip.gsub /^[\t\s]*$\n/, ''
    end

  end
end

Liquid::Template.register_tag('removeemptylines', Jekyll::RemoveEmptyLines)