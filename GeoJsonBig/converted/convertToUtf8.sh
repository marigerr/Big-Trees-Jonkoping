#$ iconv -f ISO-8859-1 -t UTF-8 < input.txt > output.txt


LIST= ls *.geojson
for i in $LIST;
do iconv -f ISO-8859-1 -t UTF-8 $i -o $i."utf8";
mv $i."utf8" $i;
done