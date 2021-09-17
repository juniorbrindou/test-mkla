'use strict';

const GitFile = require('./gitfile-axios');
var file = new GitFile('cheicky.txt');

(async ()=>{
    try {
        file.content = 'Joli garçon sans produits ghanéens';

        await file.update();
        console.log('Fichier ', file.name,  'créé');

        file.content='';
        file.sha = ''
        await file.read();
        console.log(file.content);

        await file.delete();
        console.log('Fichier ', file.name,  'supprimé');


    } catch (error) {
        console.log(error);
    }
    

})();