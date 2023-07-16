'use strict';

const axios = require('axios');

class GitFile{
    constructor(filename){
        this.name = filename;

        this.content = "";
        this.sha = "";
    }

    


    read(){
        return new Promise((resolve, reject)=>{
            axios.get('https://api.github.com/repos/225junior/test-mkla/contents/' + this.name + '?ref=main', {
                headers:{
                    'Accept':'application/vnd.github.v3+json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization':'Bearer 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',
                    'User-Agent': 'nodejs'
                }
            })
            .then(resp=>{
                //console.log(resp.data);
                let str = resp.data.content;  
                let newStr = '';

                // Suppression des sauts de lignes
                for (var i = 0; i < str.length; i++) {
                    let c = str.charAt(i);
                    if(c != '\n')
                        newStr += c;
                }

                this.content = Buffer.from(newStr, 'base64').toString('utf8');
                this.sha = resp.data.sha;
                
                resolve();
            })
            .catch(err=> reject(err));
        })    
    }

    

    update(){
        return new Promise((resolve, reject)=>{
            let json = {'sha': this.sha, 'message': 'git message', 'branch':'master', 'content': Buffer.from(this.content).toString('base64')};
            let data = JSON.stringify(json);

            axios.put('https://api.github.com/repos/sylvanuskla/test/contents/' + this.name, {
                'sha': this.sha, 
                'message': 'git message', 
                'branch':'main', 
                'content': Buffer.from(this.content).toString('base64')
            }, {
                headers:{
                    'Accept':'application/vnd.github.v3+json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization':'Bearer ',
                    'User-Agent': 'nodejs'
                }
            })
            .then(resp=> {
                this.sha = resp.data.content.sha;
                        
                resolve();
            })
            .catch(error => {
                reject(error)
            })
        });
    }


    delete(){
        return new Promise((resolve, reject)=>{
            let json = {'sha': this.sha, 'message': 'git message', 'branch':'master', 'content': Buffer.from(this.content).toString('base64')};
            let data = JSON.stringify(json);

            axios.delete('https://api.github.com/repos/sylvanuskla/test/contents/' + this.name, {
                data: {
                    'sha': this.sha, 
                    'message': 'git message', 
                    'branch':'main'
                 },
                headers:{
                    'Accept':'application/vnd.github.v3+json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization':'Bearer ',
                    'User-Agent': 'nodejs'
                }
            })
            .then(resp=> {
                this.sha = '';
                        
                resolve();
            })
            .catch(error => reject(error))
        });
    }
}

module.exports =  GitFile;