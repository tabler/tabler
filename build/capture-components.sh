rm -rf ../static/img/components/*

for file in ../pages/_components/*.html; do
  file="$(basename -- $file)"
  file="${file%.html}"
  url="http://localhost:3001/components/$file.html"
  echo $url

  capture-website $url --element="#component-wrapper" --scale-factor=2 >../static/img/components/$file.png
  convert ../static/img/components/$file.png -gravity Center -crop 1648x824-0-0! -background "#F5F7FB" -flatten +repage -resize 1280x640 ../static/img/components/$file.png
done
