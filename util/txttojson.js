const fs = require('fs');
const path = require('path');
const { v4 : generateID } = require('uuid');



const jsonfy = (text, lineNum) => {
    const lines = text.split('\n');
    let arr = []
    lines.forEach((line, index) => {
        if (index < lineNum) {
            const json = {}
            json["name"] = line.split(' - ')[0];
            json["set"] = line.split(' - ')[1].split(' -- ')[0];
            json["type"] = line.split(' - ')[1].split(' -- ')[1].split(' : ')[0];
            json["lowestPrice"] = +line.split(' - ')[1].split(' -- ')[1].split(' : ')[1].split(' ')[0].split('-')[0];
            json["highestPrice"] = +line.split(' - ')[1].split(' -- ')[1].split(' : ')[1].split(' ')[0].split('-')[1];
            json["currency"] = '$';
            json["rarity"] = line.split(' - ')[1].split(' -- ')[1].split(' : ')[1].split(' ')[1];
            json["sold"] = false;
            arr.push(json);
        }
    });
    return arr;
}

const generateJson = async () => {
    try {
        const filePath = path.join(`${__dirname}`,'../', 'data', 'yogioh.text')
        const textData = await fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
        const jsonArr = jsonfy(textData, 39);
        let high = 0;
        let low = 0;
        jsonArr.forEach(item=>{
            high+=item.highestPrice;
            low+=item.lowestPrice;
        });
        let endJson = {}
        endJson["cards"] = jsonArr;
        endJson["potentialEarnings"] = {
            "high": high,
            "low": low
        }
        endJson["quntity"] = jsonArr.length; 
        return endJson;
    } catch (err) {
        console.error(err);
    }
}


module.exports = { generateJson }