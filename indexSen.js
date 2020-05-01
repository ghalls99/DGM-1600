import { senators } from './senators.js'

const senatorDiv = document.querySelector('.senators');


function populateSenatorDiv(senator) {
    senator.forEach(item => {
        let middleName = item.middle_name ? ` ${item.middle_name} ` : ` `;

        let senFigure = document.createElement('figure');
        let figImg = document.createElement('img');
        let figCaption = document.createElement('figcaption');


        figImg.src = `https://www.govtrack.us/static/legislator-photos/${item.govtrack_id}-200px.jpeg`;
        figCaption.textContent = `${item.first_name}${middleName}${item.last_name}`;

        senFigure.appendChild(figImg);
        senFigure.appendChild(figCaption);
        senatorDiv.appendChild(senFigure);
    })

}

const loadAllSenators = () => {
    populateSenatorDiv(senators);
}

showAll.addEventListener('click', () => {
    senatorDiv.innerHTML = '';

    loadAllSenators();
})

filterRepPartyResults.addEventListener('click', () => {
    let filterRep = filterSenators('party', 'R');
    senatorDiv.innerHTML = '';

    populateSenatorDiv(filterRep);
    console.log(populateSenatorDiv(filterRep));
})

filterDemPartyResults.addEventListener('click', () => {
    let filterRep = filterSenators('party', 'D');
    senatorDiv.innerHTML = '';

    populateSenatorDiv(filterRep);
})


filterIndiPartyResults.addEventListener('click', () => {
    let filterRep = filterSenators('party', 'ID');
    senatorDiv.innerHTML = '';

    populateSenatorDiv(filterRep);
})


const filterSenators = (prop, value) => {
    return senators.filter(senator => {
        return senator[prop] === value;
    })
}
const senatorNames = senators.map(senator => {
    let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
    return {
        id: senator.id,
        name: `${senator.first_name}${middleName}${senator.last_name}`,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`
    }
})

console.log(senatorNames)

loadAllSenators();