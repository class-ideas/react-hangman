require 'open-uri'
require 'json'

words = []

(1..20).each do |i|
  html = open("http://worddetail.org/most_common/nouns/#{i}") {|f| f.read }
  words << html.scan(/definition\/([a-z]+)'/)
end

good_words = words.flatten.select do |word| 
  word.size > 4 && word.size < 12
end

puts JSON.pretty_generate(good_words)
