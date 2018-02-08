#!/bin/sh
# Find legacy docs and frame them
for file in `ls */index.html` ; do
  if grep -q ".title ng-bind-template=.UI Router: {{partialTitle}}..Docs..title." $file ; then
    if head -n 1 $file | grep -q "^---$" ; then
      echo "skipping $file";
    else
      echo "processing legacy docs: $file";
      (echo "---"; \
       echo "---"; \
       echo "{% raw %}"; \
       cat $file | sed -e 's/navbar-fixed-top//g' \
       echo "{% endraw %}"; \
      ) > $file.tmp &&  mv -f $file.tmp $file;
    fi
  fi
done

# Add jekyll --- --- header--- to all html files, so jekyll will process them
for file in `find . -name "*.html" | grep -v "/partials/"` ; do
  if head -n 1 $file | grep -q "^---$" ; then
      echo "skipping $file";
  else
      echo "processing $file";
      (echo "---"; \
       echo "---"; cat $file \
      ) > $file.tmp &&  mv -f $file.tmp $file;
  fi
done

find . -type d -depth 1 | sort | node ./paths_as_json_array.js > versions.json

for i in `find . -type d -depth 1` ; do
  pushd $i;
  find . -name "*.html" | sort | node ../paths_as_json_array.js > files.json
  popd;
done
