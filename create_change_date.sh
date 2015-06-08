if date --version >/dev/null 2>&1 ; then
    echo "Using GNU date"
    if $TRAVIS; then
    	sudo update-locale LANG=de_DE
	fi
    LANG=DE_de date -d@"$(git log -1 --pretty=format:%ct)" "+%e. %B %Y %H:%M"

else
    echo "Not using GNU date"
    LANG=DE_de date -r "$(git log -1 --pretty=format:%ct)" "+%e. %B %Y %H:%M"
fi

