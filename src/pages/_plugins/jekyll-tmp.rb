Jekyll::Hooks.register :site, :post_read do |site|
  if Jekyll.env == 'production'
    site.pages.delete_if do |page|
      if page.data['tmp']
        true
      end
    end
  end
end