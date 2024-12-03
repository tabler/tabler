def get_changelog()
  # return content of changelog.md file if exists
  changelog_path = File.join(Dir.pwd, 'CHANGELOG.md')

  if File.exist?(changelog_path)
    File.read(changelog_path, encoding: 'utf-8')
  else
    ''
  end

  
end

module Jekyll
  Jekyll::Hooks.register :pages, :pre_render do |page, jekyll|
    jekyll.site['changelog'] = get_changelog()
  end

  Jekyll::Hooks.register :documents, :pre_render do |doc, jekyll|
    jekyll.site['changelog'] = get_changelog()
  end
end