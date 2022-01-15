import { Usuario } from "./usuario.model";
import * as firebase from "firebase";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class Autenticacao{
    //Atributos
    public token_id:any;

    constructor(
        private router:Router
    ){}

    //---------------------------------------------
    //Metodo Cadastrar
    //--------------------------------------------
    public cadastrarUsuario(usuario:Usuario) : Promise<any>{

       return firebase.auth().createUserWithEmailAndPassword(
            usuario.email,
            usuario.senha
        ).then((resposta:any)=>{
            console.log('SUCESSO -->' + resposta);
            
            //Remover senha do banco de dados e utilizar apenas no banco de autenticação
            usuario.senha = '';

            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
            .set({usuario})
        }).catch((error:Error)=>{
            console.log('ERRO -->' + error)
        })
    }

    //--------------------------------------
    //Metodo Autenticar
    //---------------------------------------
    public autenticar(email:string, senha:string):void{
        let router = this.router
        var aux = ''

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((resposta: any) => {
            console.log('SUCESSO --> ' + resposta)
           
            firebase.auth().onAuthStateChanged(function(user:any) {
                
                if (user) {
                    user.getIdToken().then(function(idToken:any) {  // <------ Check this line
                       console.log(idToken);
                       aux = idToken;     
                       localStorage.setItem('idToken',aux );
                       router.navigate(['/home']);
                    });
                }
            });
        })
    }

    //----------------------------------------
    //Metodo autenticado
    //----------------------------------------
    public autenticado():boolean {
        let idTokenStorag = localStorage.getItem('idToken');
        this.token_id = idTokenStorag;

        console.log(`STORAGE ID TOKEN -->${idTokenStorag}`)
        console.log(`TOKEN_ID -->${this.token_id}`)

        if (this.token_id !== null && idTokenStorag !=null){
            this.token_id = idTokenStorag;
        }

        if (this.token_id == null && idTokenStorag ==null){
            this.router.navigate(['/']);
        }

        return this.token_id !== null
    }
    
    //----------------------------------------
    //Metodo Sair
    //----------------------------------------
    public sair():void{
        
        firebase.auth().signOut()
        .then(()=>{
            localStorage.removeItem('idToken');
            this.token_id = null;
            this.router.navigate(['/']);
        })
    }
}