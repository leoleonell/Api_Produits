const express = require('express');
const bodyparser = require('body-parser');
const cors = require ('cors');
const mysql = require('mysql2');


const app = express();


app.use(cors());
app.use(bodyparser.json());



//database connection
 const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'gestionproduit',
    port:3306
 });

//Verification de la connection a la base de donnees

db.connect(err=>{
    if(err){console.log(err,'dberr');}
    console.log('database connected...');
})

//Recuperation de tous les produits

app.get('/produits' , (req,res)=>{
   let qr = `select * from produits`;
   db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                messsage:'Voici la liste de tous les produits',
                data:result
            })
        }
   })
})



//Recupération d'un produit par son id

app.get('/produits/:id_produit',(req,res)=>{
    let gID = req.params.id_produit;
    let qr = `select * from produits where id_produit =${gID}`;
    db.query(qr,(err,result)=>{
         if(err)
         {
             console.log(err,'err');
         }
         if(result.length>0)
         {
             res.send({
                 messsage:'recupration du produit avec succes',
                 data:result
});
 }
 else{
    res.send({
        message:'produit introuvable'
    });
 }
})
});

// creation/ajout de produit

app.post('/produits',(req,res)=>{
    console.log(req.body,'createproduit');
    let Nom = req.body.Nom;
    let prixUnitaire = req.body.prixUnitaire;
    let Designation = req.body.Designation;
    let qr =`insert into produits(Nom,prixUnitaire,Designation) 
    values('${Nom}','${prixUnitaire}','${Designation}')`;
    console.log(qr,'qr')

    db.query(qr,(err,result)=>{

      if(err){console.log(err);}
      console.log(result,'result')
      res.send({
        message:'Ajout de produit avec succes'

      });
      
    });
});

//Modification de produit
app.put('/produits/:id_produit',(req,res)=>{

    console.log(req.body,'moficationproduit');

    let gID = req.params.id_produit;
    let Nom = req.body.Nom;
    let prixUnitaire = req.body.prixUnitaire;
    let Designation = req.body.Designation;



    let qr = `update produits set Nom ='${Nom}', prixUnitaire ='${prixUnitaire}',Designation ='${Designation}' where id_produit = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message:'modification du produit avec succes'
        });
    });
});

// supprimer un produit 

app.delete('/produits/:id_produit',(req,res)=>{
    let qID = req.params.id_produit;

    let qr = `delete from produits where id_produit ='${qID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send(
            {
            message:'suppression de produit avec succes'
            }
        )
    });
});

app.listen(3000,()=>{
    console.log('Demarrage du serveur..');

  

})
