def get_dir(dir)
  size = dir.split('/').size

  if size == 2
    '..'
  elsif size == 3
    '../..'
  elsif size == 4
    '../../..'
  elsif size == 5
    '../../../..'
  else
    '.'
  end
end

module Jekyll
  Jekyll::Hooks.register :pages, :pre_render do |page, jekyll|
    jekyll.site['base'] = get_dir(page.dir)
  end

  Jekyll::Hooks.register :documents, :pre_render do |doc, jekyll|
    jekyll.site['base'] = get_dir(doc.relative_path)
  end
end
