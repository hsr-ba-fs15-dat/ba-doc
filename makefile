TEX=pdflatex
GLO=makeglossaries
BIB=biber
ETEX=etex

all: preamble
	latexmk -pdf -r .latexmkrc main

preamble:
	$(TEX) -ini -shell-escape -interaction=nonstopmode -jobname="preamble" "&pdflatex" mylatexformat.ltx """main.tex"""  

main:
	$(TEX) -synctex=1 -interaction=nonstopmode -halt-on-error -shell-escape main.tex

no-output:
	$(TEX) -draftmode -interaction=nonstopmode -halt-on-error -shell-escape main.tex

glo:
	$(GLO) main

bib:
	$(BIB) main

clean:
	rm -rf main.pdf _minted-* *.aux *.bbl *.bcf *.blg *.decisions *.fdb_latexmk *.fls *.fmt *.glg *.glo *.gls *.ist *.listing *.lof *.log *.lot *.minted *.mw *.out *.pseudocode *.run.xml *.sta *.synctex.gz *.toc
