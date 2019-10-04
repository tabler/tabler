for file in ../pages/_components/*.md
do
  file="$(basename -- $file)"
  file="${file%.md}"
  url="http://localhost:3001/components/$file.html"
  echo $url

  capture-website $url --element="#component-wrapper" --scale-factor=2 > ../components/$file.png
done
