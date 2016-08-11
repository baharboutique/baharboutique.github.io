require "jekyll-assets"

module Jekyll
  # For using proxies on images where only the path is required
  class ImagePath < Jekyll::Assets::Liquid::Tag
    def initialize(tag, args, tokens)
      super("img", args, tokens)
    end
    private
    def build_html(args, sprockets, asset, path = get_path(sprockets, asset))
        path
    end
  end
end

Liquid::Template.register_tag('image_path', Jekyll::ImagePath)
Liquid::Template.register_tag('img_path', Jekyll::ImagePath)