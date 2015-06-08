LANG=de_DE date -v "$(git log -1 --date=local --pretty=format:%cd)" "+%e. %B %Y %H:%m"
