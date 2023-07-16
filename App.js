'use strict';

const GitFile = require('./gitfile');
var file = new GitFile('test.txt');

(async ()=>{
    try {
        // file.content = 'Joli garçon sans produits ghanéens';

        // await file.update();
        // console.log('Fichier ', file.name,  'créé');

        // file.content='';
        // file.sha = ''
        await file.read();
        console.log(file.content);

        // await file.delete();
        // console.log('Fichier ', file.name,  'supprimé');


    } catch (error) {
        console.log(error);
    }
    

})();