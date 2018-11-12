var whitespace=/\s/g
function GithubSlugger(){if(!(this instanceof GithubSlugger))return new GithubSlugger
this.reset()}function lower(e){return e.toLowerCase()}function slugger(e){return"string"!=typeof e?"":(e=e.replace(/[A-Z]+/g,lower)).trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,.\/:;<=>?@\[\]^`{|}~]/g,"").replace(whitespace,"-")}GithubSlugger.prototype.slug=function(e){var r=slugger(e),t=this.occurrences[r]
return this.occurrences.hasOwnProperty(r)?t++:t=0,this.occurrences[r]=t,t&&(r=r+"-"+t),r},GithubSlugger.prototype.reset=function(){this.occurrences={}}
