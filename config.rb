###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end
ENV = YAML::load(File.open('aws.yml')) 

activate :contentful do |f|
  f.space         = {Products: ENV['CONTENTFUL_SPACE']}
  f.access_token  =  ENV['CONTENTFUL_ACCESS_TOKEN']
  f.cda_query     = { content_type: ENV['CONTENTFUL_CONTENT_TYPE'], include: 1 }
  f.content_types = { Product: ENV['CONTENTFUL_CONTENT_TYPE']}
end

# Configuration code for Middleman AWS S3 Sync
# See middleman-s3_sync documentation https://github.com/fredjean/middleman-s3_sync
activate :s3_sync do |s3_sync|
  # The name of the S3 bucket you are targeting.
  s3_sync.bucket                     = ENV['AWS_S3_BUCKET_NAME']
  # The AWS region code for your bucket.
  # For region codes: http://www.bucketexplorer.com/documentation/amazon-s3--amazon-s3-buckets-and-regions.html
  s3_sync.region                     = ENV['AWS_REGION']
  s3_sync.aws_access_key_id          = ENV['AWS_ACCESS_KEY_ID']
  s3_sync.aws_secret_access_key      = ENV['AWS_SECRET_KEY']
  #s3_sync.delete                     = true
  #s3_sync.after_build                = true 
end

# CloudFront cache invalidation
# See middleman-cloudfront gem documentation: https://github.com/andrusha/middleman-cloudfront
activate :cloudfront do |cf|
  cf.access_key_id                   = ENV['AWS_ACCESS_KEY_ID']
  cf.secret_access_key               = ENV['AWS_SECRET_KEY']
  cf.distribution_id                 = ENV['PRODUCTION_CLOUDFRONT_DISTRIBUTION_ID']
  cf.filter                          = /\.html$/i
  #cf.after_build                     = false  # default is false
end

after_s3_sync do |files_by_status|
  invalidate files_by_status[:updated]
end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
