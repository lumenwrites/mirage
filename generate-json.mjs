import fs from 'fs'

function readFile(fileName) {
  return fs.promises.readFile(fileName, {encoding: 'utf-8'});
}

function getFirstLine(text) {
    var lines = text.split("\n");   // split all lines into array
    var firstline = lines.shift();   // read and remove first line
    var rest = lines.join("\n");     // re-join the remaining lines
    return firstline
}

function getText(text) {
    var lines = text.split("\n");   // split all lines into array
    var firstline = lines.shift();   // read and remove first line
    var rest = lines.join("\n");     // re-join the remaining lines
    return rest
}

function removeHashtags(text) {
    text = text.split(" ")
    text.shift()
    text = text.join(" ")
    return text
}

var categoriesJson = []
var spellsJson = [] // in case i need it
readFile("./markdown/abilities.md").then((text)=>{
    var categories = text.split("----")
    
    categories.map((category)=>{
	category = category.trim()
	var categoryTitle = getFirstLine(category);
	categoryTitle = removeHashtags(categoryTitle).trim()
	var spells = getText(category).split("\n\n")

	var categoryJson = {
	    title: categoryTitle,
	    spells: []
	}
	spells.map((spell)=> {
	    var spellHeader = getFirstLine(spell)
	    var spellDescription = getText(spell)
	    spellHeader = removeHashtags(spellHeader).trim()
	    var spellTitle = spellHeader.split("|")[0].trim()
	    var spellLevel = parseInt(spellHeader.split("|")[1].trim())

	    var spellJson = {
		title: spellTitle,
		description: spellDescription,
		type: "Ability",
		category: categoryTitle,
		level: spellLevel
	    }

	    //console.log(spellJson)
	    categoryJson.spells.push(spellJson)
	    spellsJson.push(spellJson)
	})
	categoriesJson.push(categoryJson)
    })

    //console.log(spellsJson)
    var outputText = JSON.stringify(categoriesJson)
    fs.writeFile('./client/data/abilities.json', outputText , 'utf8', ()=>{})
})



