www:
	mkdir -p www

docs: www
	alvu --path=./docs --out www --baseurl=/mage/

docs_dev:
	ls docs/**/* ./readme.md | entr alvu --path=./docs --out www

pages: docs
	rm -rf .tmp
	mkdir -p .tmp
	mv www/* .tmp/
	git checkout gh-pages
	rm -rf ./*
	mv .tmp/* .
	git add -A; git commit -m "update pages"; git push origin gh-pages;
	git checkout main
	rm -rf .tmp
