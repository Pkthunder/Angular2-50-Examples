#!/bin/bash

count=1
url='https://raw.githubusercontent.com/curran/screencasts/gh-pages/introToAngular/examples/snapshots/snapshot'
urlEnd='/index.html'
urlFinal=''
$name=''

while [ $count -lt 51 ]; do
	echo $count:
	if [ $count -lt 10 ]; then
		urlFinal=$url'0'$count$urlEnd
		name='0'$count
	else
		urlFinal=$url$count$urlEnd
		name=$count
	fi
	#echo $urlFinal
	mkdir ex$name
	cd ex$name
	wget $urlFinal
	cp index.html ex$name.html
	rm index.html
	cd ..
	echo Done...
	let count+=1
done

echo Transfer Completed!

