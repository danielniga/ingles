import React, { Component } from 'react';
import {
StyleSheet,
Text,
Image,
ImageBackground,
View,
TouchableOpacity,
Platform,
ToastAndroid,
FlatList,
} from 'react-native';
import Voice from 'react-native-voice';
//import textoIngles from './textoIngles';

var SoundPlayer = require('react-native-sound');

var song = null;


export default class Home extends Component {
  static navigationOptions = {
    header:null
  }
  constructor(props){
    super(props);
    this.state={
      result: [],
      listening: false,
      pause: false,
      mostraMod: false,
      mostraBtn: true,
      nunSorteado:'',
      textoBtn:'MÓDULO 01',
      musica:'',
      texto:'',
      modulos: [{KEY:0, MOD: 'MÓDULO 01',INICIO:0, FIM:29},
                {KEY:1, MOD: 'MÓDULO 02',INICIO:30, FIM:59},
                {KEY:2, MOD: 'MÓDULO 03',INICIO:60, FIM:89},
                {KEY:3, MOD: 'MÓDULO 04',INICIO:90, FIM:119},
                {KEY:4, MOD: 'MÓDULO 05',INICIO:120, FIM:150},
                {KEY:5, MOD: 'MÓDULO 06',INICIO:151, FIM:180},
                {KEY:6, MOD: 'MÓDULO 07',INICIO:181, FIM:210},
                {KEY:7, MOD: 'MÓDULO 08',INICIO:211, FIM:240},
                {KEY:8, MOD: 'MÓDULO 09',INICIO:241, FIM:271},
                {KEY:9, MOD: 'MÓDULO 10',INICIO:272, FIM:302},
                {KEY:10, MOD: 'MÓDULO 11',INICIO:303, FIM:332},
                {KEY:11, MOD: 'MÓDULO 12',INICIO:333, FIM:365},
                {KEY:12, MOD: 'MÓDULO 13',INICIO:366, FIM:395},
                {KEY:13, MOD: 'MÓDULO 14',INICIO:396, FIM:425},
                {KEY:14, MOD: 'MÓDULO 15',INICIO:426, FIM:455},
                {KEY:15, MOD: 'MÓDULO 16',INICIO:456, FIM:485},
                {KEY:16, MOD: 'MÓDULO 17',INICIO:486, FIM:515},
                {KEY:17, MOD: 'MÓDULO 18',INICIO:416, FIM:545},
                {KEY:18, MOD: 'MÓDULO 19',INICIO:546, FIM:569},
                {KEY:19, MOD: 'MÓDULO 20',INICIO:470, FIM:599},
                {KEY:20, MOD: 'MÓDULO 21',INICIO:600, FIM:629},
                {KEY:21, MOD: 'MÓDULO 22',INICIO:630, FIM:659},
                {KEY:22, MOD: 'MÓDULO 23',INICIO:660, FIM:589},
                {KEY:23, MOD: 'MÓDULO 24',INICIO:690, FIM:719}
                ]
    };

    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechResults=this.onSpeechResults.bind(this);
    this.onPressButtonPlay=this.onPressButtonPlay.bind(this);
    this.mostraModulo=this.mostraModulo.bind(this);
    this.escondeModulo=this.escondeModulo.bind(this);
    this.gravarVoz=this.gravarVoz.bind(this);

    global.Nmod = '01'
    global.INICIO = 1
    global.FIM = 29

  }

  //==================================================================================================

  onPressButtonPlay() {
    let musica = ''
    let num_musica = ''
    let NUN_SORTEADO = Math.floor(Math.random() * ((FIM - INICIO)+1) + INICIO);
    //num_musica = ("00" + (NUN_SORTEADO + 1)).slice(-2).toString()

    num_musica = (AUDIO[NUN_SORTEADO] + '.mp3').toLowerCase().replace('-' , '')
 
    musica = 'vb'+ Nmod + 'audio' + num_musica + '.mp3'


    this.setState({nunSorteado:'' ,result:'',
                   nunSorteado: MODULOS[NUN_SORTEADO] + '\n\n' +
                                R1[NUN_SORTEADO] + '\n\n' + 
                                R2[NUN_SORTEADO] 
                 })
song = new SoundPlayer(num_musica, SoundPlayer.MAIN_BUNDLE, (error) => {song.play()});

 /*song = new SoundPlayer(num_musica, SoundPlayer.MAIN_BUNDLE, (error) => {
      if(error)
        ToastAndroid.show('Error when init SoundPlayer :(((', ToastAndroid.SHORT);
      else {
        song.play((success) => {
          if(!success)
            ToastAndroid.show('Error when play SoundPlayer :(((', ToastAndroid.SHORT);
        });
      }
    });*/
   // alert('tocando son')
    //song = new SoundPlayer(('VB01AUDIO-01.mp3').toLowerCase().replace('-' , ''), SoundPlayer.MAIN_BUNDLE, (error) => {song.play()});
  }

  onPressButtonPause() {
    song.pause();
   
  }


  //========================================================================================================

  onSpeechResults(e) {
    this.setState({
        result:e.value[0]
      });
  }
  onSpeechEnd(e){
   
     Voice.stop();                                                                              
  }

  shouldComponentUpdate(nextState){
    if (this.state.listening!=nextState.listening)
    {
      return true;
    }
    return false;
  }

  gravarVoz(){
    this.setState({result:''})

    Voice.start('en_US');
  }

  lerTexto(){
    Speech.speak({
      text: this.state.result,
      voice:'pt_BR'
    })
  }

mostraModulo(){
  let state = this.state;
  state.mostraMod = true
  state.mostraBtn = false
 
  this.setState(state)
  }

escondeModulo(item){
  let state = this.state;
  state.textoBtn = item.MOD
  INICIO = item.INICIO
  FIM = item.FIM
  Nmod = ("00" + (item.KEY + 1)).slice(-2).toString()
  state.mostraBtn = true
  state.mostraMod = false
  state.nunSorteado = '' 
  state.result = ''
  this.setState(state)
}



  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

Modulos(item){
  return(
    <TouchableOpacity style={{width:200,alignItems:'center'}} onPress={()=>{this.escondeModulo(item)}} >
        <View style={{flex:1, flexDirection:'row', height:20,alignItems:'center'}}>
            <Text style={[styles.texto,{fontSize:10}]}>{item.MOD}</Text>
        </View>
       </TouchableOpacity>
  );
 }

  render() {
    return (
       <ImageBackground style = {{flex:1}} 
                                   resizeMode='stretch'
                                   source={require('../imagens/bg6.jpg')}>

      <View style = {styles.container}>

          <View style = {{height:470,marginLeft:10,marginRight:10,alignItems: 'center',}}>
              
            {
            this.state.mostraMod && 
              <View style = {{height:460,padding:0,position:'absolute',borderRadius:25, backgroundColor:'#212121' ,zIndex:2}} >
                  <FlatList data={this.state.modulos} 
                            renderItem={({item}) => this.Modulos(item)} 
                            keyExtractor={(item, index)=>item.MOD} />
              </View>
            }


            <View style = {styles.btnModulos}>

            {
                this.state.mostraBtn && 
                 <TouchableOpacity
                    style = {styles.btnModulos}
                    onPress={this.mostraModulo}
                  >
                  
                  
                  <ImageBackground style = {{width:200,height:45,alignItems: 'center',justifyContent: 'center', marginBottom:40, marginTop:50,}} 
                                   resizeMode='stretch'
                                   source={require('../imagens/btnBlue.png')}>

                  <Text style = {[styles.texto,{color:'#FFFF00'}]}>{this.state.textoBtn}</Text>
                  </ImageBackground>
                  
                  </TouchableOpacity>
                  }
             </View>

             <View style = {{marginTop:20,}} >
                  <Text style = {styles.texto}>{this.state.nunSorteado}</Text>
                  <Text style = {[styles.texto,{marginTop:35, color:'#00FF00'}]}>{this.state.result}</Text>
              </View>

          </View>


        <View style = {{height:270,alignItems: 'center',marginTop:-130}}>
              
              <TouchableOpacity
                      style = {styles.btn2}
                      onPress={this.gravarVoz} 
                    >
                    <ImageBackground style = {{width:70,height:150,alignItems: 'center',justifyContent: 'center',}} 
                                   resizeMode='stretch'
                                   source={require('../imagens/microfone_verde_m.png')}>
                    </ImageBackground>
              </TouchableOpacity>
               


              
             <TouchableOpacity
                    style = {styles.btn}
                    onPress={this.onPressButtonPlay}
                  >
                  <ImageBackground style = {{width:250,height:50,alignItems: 'center',justifyContent: 'center',}} 
                                   resizeMode='stretch'
                                   source={require('../imagens/verde.png')}>
                  <Text style = {styles.texto}>PLAY</Text>
                  </ImageBackground>
              </TouchableOpacity>
              
         </View>



      </View>
      </ImageBackground>
    );
 }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding:10
    },
    buttonCommon:{
      resizeMode: 'contain',
      width:30,
      height: 30,
    },
    buttonEnabled: {
      opacity: 1.0,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
  btn:{
    width:220,
    height:40,
    borderRadius:20,
    elevation:3,
    alignItems: 'center',
    justifyContent: 'center',
  },
    btn2:{
    width:70,
    height:150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:40
  },
  texto:{
    fontSize:20,
    color:'#FFFF00',
    fontWeight:'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0, 0.7)',
    textShadowOffset: {width: -1, height:1},
    textShadowRadius: 1,
  },
  btnModulos:{
    width:200,
    height:30,
    borderRadius:25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:1
  }
});

const MODULOS = [
'There was a problem with the update'
,'There was a bomb on the plane'
,'There was an error'
,'The system had been developed by professor David'
,'She had been hired as a project manager'
,'His obedience had been tested'
,'He was detained by the US customs'
,'She was caught in the explosion'
,'It was written in the stars'
,'They were all together in one place'
,'They were very poor'
,'They were at the beach'
,'Which of them is your brother?'
,'Which of them matter, and why?'
,'Which of them is more efficient?'
,'You have to think for yourself'
,'Go and see for yourself'
,'What to expect when you work for yourself'
,'I thought I was dreaming'
,"And you thought dragons didn't exist"
,'He thought he had won'
,"I'm looking for a job"
,'Who are you looking for?'
,"I still haven't found what I'm looking for"
,'We were able to finish the project'
,"They were able to make accurate predictions"
,'How were you able to find me?'
,"Where do you live?"
,"Where do you come from?"
,'Where do you see yourself in 5 years?'


,'I come from a family of business people'
,"Don't forget where you came from"
,'He comes from a good family'
,"That's what I said"
,'He said he loves me'
,'They said it would be fun'
,'Did you know that he was lying?'
,'Did you go to the beach?'
,'Did you ask for a raise?'
,'Tips for people who want to learn English'
,'The person who needs it the most'
,'How to deal with people who try to manipulate you'
,'When I found you'
,'What happened when I told everyone'
,'What happened when I gave him a second chance'
,"How are you doing? I'm great"
,"How is he doing? He's fine"
,"How is she doing? She's great"
,'Sometimes I feel a little lonely'
,'Sometimes I say yes, sometimes I say no'
,'Sometimes I make mistakes'
,"That's why I'm here"
,"They were scared. That's why they left"
,"That's why you need to wait"
,'Can I ask a question?'
,'Are you sure?, he asked her'
,'He asked where I lived'
,'So that we can win'
,'So that you can leave'
,'So that you can use it again'



,"The x-ray didn't show anything"
,'You can write about anything you want'
,"You don't have to pay for anything"
,'Set the alarm for 5am and then go to bed'
,'First become effective, then become efficient'
,'We sat at the table then moved to the bar'
,'Take this and meet us halfway'
,'Take this map in case you get lost'
,'He was taken aback'
,'Remember those who helped you'
,'Those who seemed to be leaders'
,'Those who kept us safe'
,"We included a lot of things you'll love"
,'A lot of people like to run on the beach barefoot'
,'I put a lot of time into this'
,'I paid for everythingThey will continue to control everything'
,'They will continue to control everything'
,'Thanks for everything you brought us'
,"Hurry up! It's time to go!"
,"Take your time, there's no hurry"
,'He had to leave in a hurry'
,'As soon as we began our journey'
,'As soon as I met him I fell in love'
,'As soon as I felt the symptoms'
,'Tell me all about yourself'
,'The truth about how to lose weight'
,'All about how I got where I am today'
,'You can try to call the police'
,'Try to move your finger'
,'Try to sit down and think'



,'A small street behind the station'
,'The sun disappeared behind the clouds'
,"What's behind that happy smile?"
,'He knew he was right'
,'They knew what they wanted'
,'I knew you were in trouble'
,'She came up with a brilliant idea'
,"They've tried to come up with a solution"
,"Let's see what he comes up with this time"
,"We'll be home soon"
,'She sold the house soon after her husband died'
,'They arrived home sooner than expected'
,'The beach can only be reached by boat'
,'Daytime temperatures can reach 40 degrees celsius'
,'Victory is now out of her reach'
,'Three kinds of cake'
,'Exercises of this kind are very popular'
,'What kind of house do you live in?'
,'If it were today'
,'If it were easy'
,'If it were possible'
,'I could not keep the promise'
,'They could not find it anywhere'
,'We could not begin the analysis'
,'I will do my best'
,'He will take your hand'
,'She will get married'
,'Will you help me?'
,'If you will only let me help you'
,'I will fight for you if you will fight for yourself'



,"We're willing to learn"
,"I'm willing to help"
,'Are you willing to pay the price?'
,'What is required to be a comedian?'
,'Employees are required to wear uniforms'
,'Am I required to get a visa?'
,"I'm going to tell you a secret"
,"I'm not going to answer that question"
,"You're going to lose that girl"
,"You're not going to believe this"
,"He's going to be a father"
,"He's not going to change"
,"It's going to happen"
,"It's not going to be easy"
,"They're going to do everything they can"
,"They're not going to solve the problem"
,"I've got to go now"
,"You've got to be careful"
,"He's got to start taking responsibility"
,"She's got to keep fighting"
,"We've got to do something"
,"They've got to stop dreaming"
,'As he learns how to control his emotions'
,'As she tries to decide what to do'
,'As you get older'
,"I don't want to talk to you anymore"
,"Talk to your doctor if you're still worried"
,'Who were you talking to just now?'
,'Tell me where you live'
,'He told the news to everybody he saw'
,"They've told us they're not coming"



,"It's an amazing book, you should read it"
,"I don't always do everything I should"
,"You shouldn't drink and drive"
,"It's the best day of my life"
,"It's hard for me to say I'm sorry"
,"It's an honor to be with you today"
,"A sudden change"
,"Don't make any sudden movements"
,"All of a sudden the lights went out"
,"Let's see what happens next week"
,"Accidents like this happen all the time"
,"I don't know how this happened"
,"I had to miss a week of school"
,"If I don't leave now I'll miss my plane"
,"We were late and missed the first part of the concert"
,"It makes me feel better"
,"It made me feel more comfortable"
,"How to make her feel special"
,"I'm sorry, I've forgotten your name. Can you remind me?"
,"He reminds me of my father"
,"I need the notes to remind me what to say"
,"I could have died"
,"He could have won"
,"We could have done more"
,"The distance between two places"
,"Two periods of study with a short break between"
,"Q comes between P and R in the English alphabet"
,"Let's do it again"
,"Don't do it again"
,"We did it again"



,"How do you say no to customers?"
,"How did you get here?"
,"How does he do this?"
,"I wonder who she is"
,"I wonder if they'll get married"
,"I was wondering about the best place for a holiday"
,"Someone is looking at you"
,"He looked at the food on his plate"
,"Looking at it from that point of view, his decision is easier to understand"
,"She spent $100 on a new dress"
,"I've spent all my money already"
,"How do you spend your spare time?"
,"She finished law school last year"
,"I thought you'd never finish"
,"Let me just finish what I'm doing"
,"It's cold outside"
,"You can't open the door from the outside"
,"The outside of the house needs painting"
,"You didn't notice that I got my hair cut"
,"The first thing I noticed about the room was the smell"
,"Nobody really noticed the changes"
,"The male bird has a red spot on its beak"
,"He showed me the exact spot where he had asked her to marry him"
,"His jacket was covered with spots of mud"
,"Do you know his address?"
,"Martin was lying all the time. I should have known"
,"The cause of the fire is not yet known"
,"Can you find out what time the meeting starts?"
,"The police are determined to find out who killed Louise"
,"Her parents found out that she had a boyfriend"



,"39 ways to not be like everyone else"
,"Take this math test and compare your answers to everyone else"
,"I'm not like everybody else"
,"That's when things get complicated"
,"That's when I knew"
,"And that's when the fight started"
,"It matters"
,"It doesn't matter"
,"It makes sense"
,"It doesn't make sense"
,"It works"
,"It doesn't work"
,"Please pick up some wine at the store"
,"Please pick up that book from the floor"
,"I'll pick you up at the airport"
,"I don't like him at all"
,"He's unable to walk at all"
,"They have nothing at all to say"
,"They have permission to build 200 new houses"
,"A house built of stone"
,"They're building a new bridge over the river"
,"This is John. Do you remember him?"
,"As far as I can remember, this is the third time we've met"
,"I can still vividly remember my grandfather teaching me to play cards"
,"Would you like to play? No thanks, I'll just watch"
,"We watched to see what would happen next"
,"Watch what I do, then you try"
,"If we miss the last bus, we'll have to walk home"
,"You can come and stay with us if you want"
,"We are ready to fight for our rights if necessary"



,"The funniest thing I've ever seen"
,"The best I've ever had"
,"The worst thing I've ever heard"
,"Don't worry. It's no big deal"
,"We'll have to pay a little more, it's no big deal"
,"A high school dropout"
,"The program is designed for dropouts who wish to get high school equivalency certificates"
,"He has dropped out of the university swim team"
,"Stay around a little longer"
,"If I had stayed around"
,"How long do you think Jason will stay around this time?"
,"How many people came to the party? Thirty or so"
,"Four hundred or so guests are invited"
,"I was born in 1976"
,"He was born in a small village"
,"She was born in Nigeria in 1911"
,"How to put a child up for adoption"
,"Should I put my baby up for adoption?"
,"Is it wrong to put my child up for adoption?"
,"He feels that they behaved badly"
,"He felt that it was necessary to say something"
,"I felt that I had to apologize"
,"I didn't mean to say that, it just popped out"
,"He opened the box, and a mouse popped out"
,"A funny thought just popped into my head"
,"He found out what he wanted"
,"I don't know when the game starts, but I'll find out"
,"We may never find out the truth about what happened"
,"He said he would be here at eight o'clock"
,"She asked if I would help"
,"They told me that they probably wouldn't come"



,"You're lying to me: you didn't go to the supermarket. But I did go there"
,"I doubt that you went. I did go"
,"As fast as a bullet"
,"Is the school as big as it looks?"
,"10 animals who are almost as smart as humans"
,"All of us"
,"All of the books"
,"How to use all of iOS 8's best features"
,"He is going to buy a Porsche"
,"The sky is very black. It's going to snow"
,"It's 8:30! You're going to miss the train"
,"I was going to sleep but"
,"He was trying to figure out why the camera wasn't working"
,"Let's figure out a way to help"
,"Can you figure out this puzzle?"
,"Things worked out in an interesting way"
,"Not everything worked out in the end and we were disappointed"
,"It all worked out well"
,"Their dog died, but they plan to get another one"
,"You should wear the blue one. The one with the stripes? No, the other one"
,"The ones on the team who are most successful practice every day"
,"Those batteries are the ones that still work"
,"When my friend still lived here, we would eat lunch together every day"
,"She would always take the nine o'clock bus"
,"I stumbled into acting when I left college"
,"How Jane Lynch stumbled into comedy"
,"I've stumbled into a successful business"
,"Stumble into trouble"
,"I find it amazing that they're still together"
,"You may find your illness hard to accept"
,"I find it hard to concentrate with that music playing"



,"Since you've finished all your chores, you may go out and play"
,"Should we invite someone else since he can't go?"
,"Since you're not interested, I won't tell you about it"
,"He looks better than he did before"
,"You wanted to enjoy the trip, and you did"
,"As they get smarter, so do the crooks"
,"She somehow managed to find her earring in the sand"
,"We must stop him from seeing her somehow"
,"Somehow he managed to pass all his final exams"
,"He would have told me"
,"What would you have done?"
,"It would have been fun"
,"We would have helped them"
,"We never would have allowed it"
,"I would have never known you"
,"She would never have let that happen"
,"The most likely outcome"
,"Tickets are likely to be expensive"
,"I think it's likely to rain this afternoon"
,"It's unlikely, but not totally impossible, I suppose"
,"I was asked to gather statistical data that could be useful down the road"
,"This is a great invention, but a marketable product is several years down the road"
,"Why worry about something that's 10 years down the road?"
,"Which door leads to the yard?"
,"Eating too much sugar can lead to health problems"
,"What led you to this conclusion?"
,"Please be aware that this survey leads you off the Wikipedia website"
,"A little farther, he leads you off the main trail"
,"A well-worn coat"
,"A well-worn phrase"



,"I didn't have any money because I had lost my wallet"
,"George had repaired many cars before he received his mechanic's license"
,"She didn't want to move. She had lived in Liverpool all her life"
,"The two of us are going to the market"
,"Two of us are going to the "
,"Among all ten of us, two are going to the market and the rest are not"
,"Release a prisoner"
,"Release a movie"
,"Firefighters took two hours to release the driver from the wreckage"
,"He refused to release her arm"
,"10.000 balloons were released at the ceremony"
,"She turns 21 in June"
,"The weather turned cold"
,"The leaves turn red in autumn"
,"She sided with her friend in the argument"
,"They betrayed their country and sided with the enemy"
,"They both sided against me"
,"I'm sure that we'll succeed eventually"
,"She hopes to get a job on the local newspaper and eventually work for The Times"
,"Our flight eventually left five hours late"
,"He left home after falling out with his parents"
,"A falling out among family members"
,"She'd fallen out with her boyfriend over his ex-girlfriend"
,"Please don't let me down"
,"I'm sorry I let you down"
,"I don't want to let you down, but I can't support you in the election"
,"She wasn't happy with our work and made us start over"
,"I'm sorry, but you'll have to start over"
,"I'm sorry, but you'll have to start all over again"
,"She saw her divorce as an opportunity to start over"
,"Try again and don't screw it up this time"
,"You really screwed up my brother by not being on time"
,"One more screw up like that and you're fired"



,"Who's gonna be there?"
,"She's gonna be okay"
,"What we're gonna do now?"
,"I haven't received my order"
,"We haven't met any aliens"
,"Don't say you haven't been warned"
,"Are you ready? No, not yet"
,"I haven't read the book yet"
,"Their suggestions won't be implemented, at least not yet"
,"I took a pill to help settle my nerves"
,"This should settle your stomach"
,"She had a drink to settle her nerves"
,"As with all things, it is best to begin with the basics"
,"As with most men, it is easier for me to give hugs than to accept them"
,"As with many mental disorders, the causes of schizophrenia are poorly understood"
,"The ball rolled on and on"
,"The years rolled on, one by one"
,"As the hours rolled on, I learned just how bored I could get without going to sleep"
,"The first day of school went something like this"
,"My summer went something like this"
,"My day went something like this"
,"The ceremony was about to begin"
,"He's standing at the edge, and I think he's about to jump"
,"You're not going to believe what I'm about to tell you"
,"All illusions fall away"
,"How to let your old limiting beliefs fall away"
,"Until I fall away"
,"They've won six games in a row"
,"I haven't had a good meal for three days in a row"
,"The children stood in a row against the wall"



,"I don't even know"
,"He never even opened the letter"
,"There are a lot of spelling mistakes, even so, it's a very good essay"
,"I'm older than her"
,"We shouldn't spend more than we earn"
,"A crowd of more than 10000 had gathered"
,"She wanted to put her affairs in order before she died"
,"Handling someone else's affairs"
,"How I spend my money is my affair"
,"How I choose to live is my affair, not yours"
,"What does this sentence mean?"
,"Everything depends on what you mean by the word free"
,"The look on her face meant only one thing: trouble"
,"Few people understand the difference"
,"I need a few things from the store"
,"I try to visit my parents every few weeks"
,"All buttoned up"
,"One of the most buttoned up companies in the business"
,"NASA's next Mars mission buttoned up for launch"
,"We eat rice every single day"
,"Unemployment is the single most important factor in the growing crime rates"
,"Tobacco is the single biggest industry in the state"
,"I'm going to clear out the cabinets tomorrow"
,"Clear out useless data on a Mac"
,"Some beautiful old buildings were torn down to make way for the new parking garage"
,"We were asked to make way for the bride and groom"
,"Most of the old buildings have made way for hotels and offices"
,"Please clear the children's toys away"
,"Would you clear away the dishes?"
,"A young woman cleared away all the empty cups"



,"Why waste money on clothes you don't need?"
,"You're wasting your time trying to explain it to him"
,"Hurry up! there's no time to waste!"
,"We set traps in the attic for the mice"
,"They were trapped in the burning building"
,"I feel trapped in my job"
,"The noise of the passing train drowned out our conversation"
,"The noise from the ice machine drowned out the music"
,"Big lies drown out truth"
,"Large, colorful illustrations bring to life the classic story of Snow White"
,"A little singing and dancing would have brought the play to life"
,"Some coffee will bring you to life"
,"Sort of like a dream"
,"They're sort of like us"
,"It's sort of like the lottery: the more people play, the bigger the jackpot gets, until someone wins"
,"When the right opportunity comes along, she'll take it"
,"He decided to give the money to the first stranger who came along"
,"I'm glad you came along"
,"The police has put out a warning about an escaped prisoner"
,"Most of the stuff they put out isn't worth watching"
,"The factory puts out 4000 units each day"
,"The doctor's advice is to let the fever run its course"
,"I had to accept that the relationship had run its course"
,"The doctor said the cold would probably run its course within a week"
,"Whenever you find yourself on the side of the majority"
,"If you find yourself thinking"
,"Find yourself in a difficult situation"
,"We took shelter beneath a huge oak tree"
,"They slept outside beneath the stars"
,"Just beneath the surface of the water"



,"I'm pretty sure I'll be going"
,"The game was pretty good"
,"It's pretty hard to explain"
,"She took the wrong approach in her dealings with them"
,"What's the best way of approaching this problem?"
,"We heard the sound of a car approaching"
,"Work towards a goal, not a paycheck"
,"The biggest pitfalls of long-term goals"
,"Our ultimate goal must be the preservation of the environment"
,"He spent the whole day writing"
,"We drank a whole bottle each"
,"A whole food restaurant"
,"The discussion focused on three main problems"
,"Each exercise focuses on a different grammar point"
,"We will keep our focus on the needs of the customer"
,"She set the camera on automatic"
,"Set the alarm for 7 o'clock"
,"They haven't set a date for their wedding yet"
,"Most of the time"
,"11 things most of us believe in"
,"We're only in Paris for a day so let's make the most of it"
,"One more question and we're done"
,"Turn out the light when you're done"
,"If you're done with that magazine, can I have a look at it?"
,"This principle forms the basis of the country's economic policies"
,"They hired her on a temporary basis"
,"The company changes its website on a daily basis"
,"The pursuit of happiness"
,"She travelled the world in pursuit of her dreams"
,"He would do anything in pursuit of wealth and fame"



,"The movie is based on a real-life incident"
,"A class-based society"
,"A Chicago based company"
,"I'm sorry, sir, but smoking is not allowed"
,"I'm not allowed to drive my dad's car"
,"Unfortunately, they didn't allow me to explain the thinking behind my decision"
,"Each answer is worth 20 points"
,"Red or blue? I'll take one of each, please"
,"We each have our own car"
,"The odds are very much in our favour"
,"The odds are heavily against him"
,"Against all odds, he made a full recovery"
,"We must approach the problem from a different standpoint"
,"This is a purely theoretical standpoint that has no basis in reality"
,"He is writing from the standpoint of someone who knows what life is like in prison"
,"Are you willing to put in the time and effort it takes to be successful?"
,"They must have put in a lot of work to achieve such an interesting exhibition"
,"He's putting a lot of work into improving his French"
,"I'll announce the weather to the passengers as soon as we get the plane off the ground"
,"A lot more money will be required to get this project off the ground"
,"Casey and his friend tried to start a band, but it never got off the ground"
,"Stress causes your body to release chemicals, which in turn boost blood pressure"
,"Her mother taught her, and she in turn taught her own daughter"
,"She spoke to each of the guests in turn"
,"Ultimately, you'll have to make the decision yourself"
,"Ultimately, it's a question of who is more popular"
,"The changes ultimately proved to be unnecessary"
,"She happened to be out when we called"
,"You don't happen to know his name, do you?"
,"The door happened to be unlocked"



,"Maybe he'll come, maybe he won't"
,"Perhaps it would be better if you came back tomorrow"
,"A change which could affect perhaps 20% of the population"
,"He took the children to Disneyland"
,"How many children do you have?"
,"I used to cry very much when I was a child"
,"It'll cost at least 500 dollars"
,"Cut the grass at least once a week in summer"
,"You could at least listen to what he says"
,"Be sure to add the right amount of salt"
,"The server is designed to store huge amounts of data"
,"There's a certain amount of truth in what you say"
,"She used a tripod to keep the camera steady"
,"The company's exports have been increasing steadily"
,"Wages have steadily increased"
,"She seemed happy"
,"What they're doing doesn't seem right to me"
,"It seemed like a good idea at the time"
,"I don't know what actually happened"
,"I didn't think I'd like the movie, but it was actually pretty good"
,"I was shocked to learn he could actually fly a plane"
,"A tough childhood"
,"It can be tough trying to juggle a career and a family"
,"You think you're so tough, don't you?"
,"The security guards pushed their way through the crowd"
,"He slept through the movie"
,"You can only achieve success through hard work"
,"It's just what I wanted"
,"I've just heard the news"
,"She was just a baby when her father went off to war"



,"By the way, I found that book you were looking for"
,"What's the time, by the way?"
,"By the way, did you hear what happened today?"
,"It doesn't feel right"
,"He felt like he'd run a marathon"
,"The interview only took ten minutes, but it felt like hours"
,"I'm going even though it may rain"
,"I like her, even though she can be annoying at times"
,"Even though I have a master's degree in business administration, I can't fill out my tax form"
,"The more you give, the more you get"
,"The more money donated, the more books purchased and the more happy children"
,"The more correct the early stages of training, the less chance there is of things going wrong"
,"Break the chocolate bar into pieces so that everyone can have some"
,"She dropped the plate and it broke into pieces"
,"She fell off a ladder and broke her arm"
,"By using the Internet you can do your shopping from home"
,"He began his speech by thanking the President and ended it by telling a joke"
,"Switch it on by pressing this button"
,"You may want to quit school now, but in the long run, you'll regret it"
,"It means spending a bit now, but in the long run it'll save us a lot of money"
,"Although prices may rise in the short run, they should begin to fall again by the end of the year"
,"These mysteries can't be solved by mere mortals like us"
,"A mere 2% of their budget has been spent on publicity"
,"You've got the job. The interview will be a mere formality"



,"I used to live in London"
,"We used to go sailing on the lake in summer"
,"I didn't use to like him much when we were at school"
,"A country struggling for independence"
,"They struggled just to pay the bills"
,"The two men struggled for control of the party"
,"Building a motor to run on charcoal is impressive"
,"Cars run on gasoline"
,"Young man, that motor will not even run on diesel oil"
,"You will be presented with a list of facts"
,"The Council has been presented with a proposal by the UK"
,"Click on Download when presented with this option"
,"Please refrain from smoking"
,"He deliberately refrained from expressing his opinion"
,"I was going to make a joke but I refrained"
,"There should be a marking to attest the product safety"
,"Olympic medals attest to our performance in the pool"
,"I can attest to the truth of his statement"
,"Some regions of the country are also prone to natural disasters"
,"An athlete who is injury prone"
,"Even the most luxurious cars are prone to excessive noise"
,"I felt mildly depressed"
,"Some of the stories were mildly amusing"
,"He has only a mild interest in politics"
,"She's been trying to bulk up at the gym"
,"The bulk of the population lives in the cities"
,"Despite its bulk and weight, the car is extremely fast"
,"You can park on either side of the street"
,"There are two types of qualification either is acceptable"
,"Pete can't go and I can't either"



,"I brush my teeth first thing in the morning"
,"I called them first thing that morning"
,"Everyday Sara calls me first thing in the morning"
,"That made me feel kind of stupid"
,"It's kind of strange the way he talks"
,"College is kind of like a preparation for the adult world"
,"By the time we arrived, the guests were already there"
,"By the time that spring arrives, she will be gone"
,"By the time it gets dark"
,"Food supplies were severely depleted"
,"The soil has been depleted by years of drought"
,"Wars in the region have depleted the country’s food supplies"
,"I was so tired I went straight to bed"
,"I'll come straight to the point your work isn’t good enough"
,"They're not being straight with you"
,"Can't we deal with this now instead of tomorrow?"
,"She chose him instead of me"
,"Instead of driving, I took a bus"
,"Let me just recap on what we've decided so far"
,"At the end of each episode there was a quick recap of important points"
,"At the end of the program, the announcer recapped the day's news"
,"Make sure you turn the oven off"
,"Remember to make sure all the doors are locked"
,"Make sure it doesn't happen again"
,"She runs a little farther every day to build up her endurance"
,"He's been trying to build up the courage to talk to her"
,"She had been away for several weeks and dust had built up on all the furniture"
,"Those are nice, but I like these better"
,"The aluminum parts are much lighter than those made from steel"
,"There are those who think she should resign"
];

const R1 =[
'Houve um problema com a atualização'  
,'Tinha uma bomba no avião'
,'Houve um erro'
,'O sistema tinha sido desenvolvido pelo professor David'
,'Ela tinha sido contratada como gerente de projetos'
,'A obediência dele tinha sido testada'
,'Ele foi detido pela alfândega norte-americana'
,'Ela foi pega na explosão'
,'Estava escrito nas estrelas'
,'Eles estavam todos juntos em um local'
,'Eles eram muito pobres'
,'They estavam na praia'
,'Qual deles é seu irmão?'
,'Qual deles importa, e por quê?'
,'Qual deles é mais eficiente?'
,'Você tem que pensar por conta própria'
,'Vá e veja você mesmo'
,'O que esperar quando você trabalha por conta própria'
,'Eu pensei que eu estava sonhando'
,'E você pensou que dragões não existiam'
,'Ele pensou que tinha ganhado'
,'Estou procurando um emprego'
,'Quem você está procurando?'
,'Eu ainda não encontrei o que eu estou procurando'
,'Nós fomos capazes de finalizar o projeto'
,'Eles foram capazes de fazer previsões precisas'
,'Como você foi capaz de me encontrar?'
,'Onde você mora?'
,'De onde você vem?'
,'Onde você vê a si mesmo em 5 anos?'



,'Eu venho de uma família de pessoas de negócios'  
,'Não se esqueça de onde você veio'
,'Ele vem de uma boa família'
,'Foi isso que eu disse'
,'Ele disse que me ama'
,'Eles falaram que seria divertido'
,'Você sabia que ele estava mentindo?'
,'Você foi para a praia?'
,'Você pediu um aumento?'
,'Dicas para pessoas que querem aprender inglês'
,'A pessoa que mais precisa'
,'Como lidar com pessoas que tentam manipular você'
,'Quando eu encontrei você'
,'O que aconteceu quando eu contei para todo mundo'
,'O que aconteceu quando eu dei a ele uma segunda chance'
,'Como vai você? Estou ótimo'
,'Como ele está? Ele está bem'
,'Como ela está? Ela está ótima'
,'As vezes eu me sinto um pouco solitário'
,'As vezes eu digo sim, as vezes eu digo não'
,'As vezes eu cometo erros'
,'É por isso que eu estou aqui'
,'Eles estavam com medo. É por isso que eles foram embora'
,'É por isso que você precisa esperar'
,'Posso fazer uma pergunta?'
,'Você tem certeza?, ele perguntou para ela'
,'Ele perguntou onde eu morava'
,'De modo que nós possamos vencer'
,'De modo que você possa ir embora'
,'De modo que você possa usar isso novamente'



,'O raio-x não mostrou nada'  
,'Você pode escrever sobre qualquer coisa que quiser'
,'Você não tem que pagar por nada'
,'Ajuste o alarme para 5 AM e então vá para a cama'
,'Primeiro se torne efetivo, depois se torne eficiente'
,'Nós sentamos na mesa e depois fomos para o bar'
,'Pegue isso e nos encontre no meio do caminho'
,'Leve este mapa caso você se perca'
,'Ele foi pego de surpresa'
,'Lembre-se de aqueles que te ajudaram'
,'Aqueles que aparentavam ser líderes'
,'Aqueles que nos mantiveram seguros'
,'Nós incluímos muitas coisas que você vai adorar'
,'Muitas pessoas gostam de correr descalças na praia'
,'Eu coloquei muito tempo nisso'
,'Eu paguei por tudo'
,'Eles continuarão a controlar tudo'
,'Obrigado por tudo que você nos trouxe'
,'Apresse-se! É hora de ir!'
,'Leve seu tempo, não há pressa'
,'Ele teve que ir embora de pressa'
,'Logo que nós começamos a nossa jornada'
,'Logo que eu encontrei ele eu me apaixonei'
,'Logo que eu senti os sintomas'
,'Conte-me tudo sobre você'
,'A verdade sobre como perder peso'
,'Tudo sobre como eu cheguei onde eu estou hoje'
,'Você pode tentar chamar a polícia'
,'Tente mover o seu dedo'
,'Tente sentar e pensar'



,'Uma pequena rua atrás da estação'  
,'O sol desapareceu atrás das nuvens'
,'O que está por trás deste sorriso feliz?'
,'Ele sabia que estava certo'
,'Eles sabiam o que queriam'
,'Eu sabia que você estava com problemas'
,'Ela bolou uma brilhante ideia'
,'Eles tentaram bolar uma solução'
,'Vamos ver o que ele vai inventar/bolar desta vez'
,'Nós estaremos em casa logo'
,'Ela vendeu a casa logo depois que o marido morreu'
,'Eles chegaram em casa mais cedo do que o esperado'
,'A praia só pode ser alcançada de barco'
,'As temperaturas durante o dia podem alcançar 40 graus celsius'
,'A vitória está agora fora do alcance dela'
,'Três tipos de bolo'
,'Exercícios deste tipo são muito populares'
,'Em que tipo de casa você vive?'
,'Se fosse hoje'
,'Se fosse fácil'
,'Se fosse possível'
,'Eu não consegui manter a promessa'
,'Eles não conseguiram encontrar em lugar nenhum'
,'Nós não conseguimos começar a análise'
,'Eu farei o meu melhor'
,'Ele vai pegar sua mão'
,'Ela vai casar'
,'Você me ajudará?'
,'Se você somente deixar eu te ajudar'
,'Eu vou lutar por você se você lutar por você mesmo'



,'Nós estamos dispostos a aprender'  
,'Eu estou disposto a ajudar'
,'Você está disposto a pagar o preço'
,'O que é necessário para ser um comediante?'
,'Os funcionários precisam usar uniformes'
,'Eu preciso obter um visto?'
,'Eu vou te contar um segredo'
,'Eu não vou responder aquela pergunta'
,'Você vai perder aquela menina'
,'Você não vai acreditar nisso'
,'Ele vai ser pai'
,'Ele não vai mudar'
,'Vai acontecer'
,'Não vai ser fácil'
,'Eles vão fazer tudo que eles podem'
,'Eles não vão resolver o problem'
,'Eu tenho que ir agora'
,'Você tem que tomar cuidado'
,'Ele tem que começar a assumir responsabilidade'
,'Ela tem que continuar lutando'
,'Nós temos que fazer alguma coisa'
,'Eles tem que parar de sonhar'
,'Conforme ele aprende a controlar suas emoções'
,'Conforme ela decide o que fazer'
,'Conforme você fica mais velho'
,'Eu não quer mais falar com você'
,'Fale com seu médico se você ainda está preocupado'
,'Com quem você estava falando agora há pouco?'
,'Conte-me onde você vive'
,'Ele contou as novidades para todo mundo que ele viu'
,'Eles nos contaram que eles não vem'



,'É um livro incrível, você deveria ler'  
,'Eu nem sempre faço tudo que eu deveria'
,'Você não deveria beber e dirigir'
,'É o melhor dia da minha vida'
,'É difícil para mim dizer Desculpe-me'
,'É uma honra estar com vocês hoje'
,'Uma mudança repentina'
,'Não faça quaisquer movimentos repentinos'
,'De repente as luzes se apagaram'
,'Vamos ver o que acontece semana que vem'
,'Acidentes como este acontecem o tempo todo'
,'Eu não sei como isso aconteceu'
,'Eu tive que perder uma semana de aulas'
,'Se eu não for agora eu vou perder meu voo'
,'Nós chegamos atrasados e perdemos a primeira parte do concerto'
,'Isso faz com que eu me sinta melhor'
,'Isso fez com que eu me sentisse mais confortável'
,'Como fazer com que ela se sinta especial'
,'Me desculpe, eu esqueci o seu nome. Você poderia me lembrar?'
,'Ele me faz lembrar do meu pai'
,'Eu preciso das anotações para me lembrar do que dizer'
,'Eu poderia ter morrido'
,'Ele poderia ter ganhado'
,'Nós poderíamos ter feito mais'
,'A distância entre dois lugares'
,'Dois períodos de estudo com uma pequena pausa'
,'Q vem entre P e R no alfabeto inglês'
,'Vamos fazer isso novamente'
,'Não faça isso novamente'
,'Nós fizemos isso novamente'



,'Você você diz não para clientes?'
,'Como você chegou aqui?'
,'Como ele faz isso?'
,'Eu imagino quem ela é'
,'Eu imagino se eles vão se casar'
,'Eu estava imaginando sobre o melhor local para um feriado'
,'Alguém está olhando para você'
,'Ele olhou para a comida em seu prato'
,'Olhando para isso deste ponto de vista, a decisão dele foi mais fácil de entender'
,'Ela gastou $100 em um novo vestido'
,'Eu já gastei todo o meu dinheiro'
,'Como você gasta o seu tempo livre?'
,'Ele terminou a faculdade de direito ano passado'
,'Eu achei que você jamais terminaria'
,'Só deixe eu terminar o que eu estou fazendo'
,'Está frio lá fora'
,'Você não consegue abrir a porta pelo lado de fora'
,'O exterior da casa precisa de pintura'
,'Você não notou que eu cortei o cabelo'
,'A primeira coisa que eu notei sobre o quarto foi o cheiro'
,'Ninguém de fato notou as mudanças'
,'O pássaro macho tem uma marca vermelha em seu bico'
,'Ele me mostrou o local exato onde ele tinha pedido ela em casamento'
,'A jaqueta dele estava coberta com manchas de lama'
,'Você sabe o endereço dele?'
,'Martin estava mentindo todo o tempo. Eu deveria ter sabido'
,'A causa do fogo é não ainda conhecida'
,'Você consegue descobrir que horas a reunião começa?'
,'A polícia está determinada a descobrir quem matou Louise'
,'Os pais dela descobriram que ela tinha um namorado'



,'39 maneiras de não ser como todo mundo'
,'Faça este teste de matemática e compare as suas respostas com os outros'
,'Eu não sou como todo mundo'
,'É nesse momento que as coisas ficam complicadas'
,'Foi nesse momento que eu soube'
,'E foi nesse momento que a briga começou'
,'Isso importa'
,'Isso não importa'
,'Isso faz sentido'
,'Isso não faz sentido'
,'Isso funciona'
,'Isso não funciona'
,'Por favor, pegue um pouco de vinho na loja'
,'Por favor, pegue aquele livro no chão'
,'Eu vou te pegar no aeroporto'
,'Eu não gosto nem um pouco dele'
,'Ele está totalmente incapacitado de andar'
,'Eles não têm absolutamente nada a dizer'
,'Eles têm permissão para construir 200 casas novas'
,'Uma casa construída de pedra'
,'Eles estão construindo uma nova ponte sobre o rio'
,'Esse é o John. Você lembra dele?'
,'Até onde eu consigo me lembrar, esta é a terceira que nós nos encontramos'
,'Eu ainda consigo me lembrar vividamente do meu avô me ensinando a jogar cartas'
,'Você gostaria de brincar? Não obrigado, eu vou só observar'
,'Nós observamos para ver o que aconteceria em seguida'
,'Observe o que eu faço, depois você tenta'
,'Se nós perdermos o último ônibus, nós teremos que ir para casa a pé'
,'Você pode vir e ficar conosco se quiser'
,'Nós estamos prontos para lutar por nossos direitos caso necessário'



,'A coisa mais engraçada que eu já vi'
,'O  melhor que eu já tive'
,'A pior coisa que eu já ouvi'
,'Não se preocupe. Não é nada demais'
,'Nós teremos que pagar um pouco mais, isso não é um problema'
,'Um desistente do ensino médio'
,'O programa é feito para desistentes que desejam obter certificados equivalentes ao ensino médio'
,'Ele abandonou o time de natação da universidade'
,'Fique um pouco mais'
,'Se eu tivesse ficado por lá'
,'Por quanto tempo você acha que o Jason irá permanecer desta vez?'
,'Quantas pessoas vieram na festa? Mais ou menos 30'
,'Mais ou menos quatrocentos convidados estão convidados'
,'Eu nasci em 1976'
,'Ele nasceu em uma pequena aldeia'
,'Ela nasceu na Nigéria em 1911'
,'Como colocar uma criança para adoção'
,'Eu devo colocar meu bebê para adoção?'
,'É errado colocar meu filho para adoção?'
,'Ele acha que eles se comportaram mal'
,'Ele achou que era necessário dizer algo'
,'Eu achei que eu tinha que pedir desculpas'
,'Eu não quis dizer isso, simplesmente saiu'
,'Ele abriu a caixa, e um rato saiu'
,'Um pensamento engraçado acabou de aparecer em minha cabeça'
,'Ele descobriu o que ele queria'
,'Eu não sei quando o jogo começa, mas eu vou descobrir'
,'Nós podemos jamais descobrir a verdade sobre o que aconteceu'
,'Ele disse que ele estaria aqui às 8 horas'
,'Ele perguntou se eu ajudaria'
,'Eles me falaram que eles provavelmente não viriam'



,'Você está mentindo para mim: você não foi ao supermercado. Mas eu fui lá'
,'Eu duvido que você foi. Eu fui'
,'Tão rápido quanto uma bala'
,'A escola é tão grande quanto parece?'
,'10 animais que são quase tão espertos quanto os humanos'
,'Todos nós'
,'Todos os livros'
,'Como usar todos os melhores recursos do iOS 8'
,'Ele vai comprar um Porsche'
,'O céu está muito preto. Vai nevar'
,'É 8:30! Você vai perder o trem'
,'Eu ia dormir, mas'
,'Ele estava tentando descobrir por que a câmera não estava funcionando'
,'Vamos descobrir uma maneira de ajudar'
,'Você consegue descobrir este quebra-cabeça?'
,'As coisas terminaram de uma maneira interessante'
,'tudo funcionou no final e nós ficamos desapontados'
,'Tudo funcionou bem'
,'O cachorro deles morreu, mas eles planejam ter outro'
,'Você deveria vestir o azul. Aquele com as faixas? Não, o outro'
,'Aqueles no time que são mais bem-sucedidos praticam todos os dias'
,'Aquelas baterias são as que ainda funcionam'
,'Quando meu amigo ainda morava aqui, nós almoçávamos juntos todos os dias'
,'Ela sempre pegava o ônibus das nove horas'
,'Eu me envolvi com encenação quando eu saí da universidade'
,'Como Jane Lynch se envolveu com a comédia'
,'Eu me envolvi com um negócio de sucesso'
,'Envolver-se em problemas'
,'Eu acho incrível que eles ainda estão juntos'
,'Você pode achar sua doença difícil de aceitar'
,'Eu acho difícil de se concentrar com aquela música tocando'



,'Uma vez que você terminou todos os seus afazeres, você pode sair e brincar'
,'Nós devemos convidar mais alguém uma vez que ele não pode ir'
,'Uma vez que você não está interessado, eu não vou lhe contar'
,'Ele parece melhor do que parecia antes'
,'Você queria aproveitar a viagem, e você aproveitou'
,'Conforme eles ficam mais espertos, também ficam os trapaceiros'
,'Ela de algum modo deu um jeito de encontrar seu brinco na areia'
,'Nós preciamos parar ele de ver ela de algum modo'
,'De algum modo ele deu um jeito de passar em todas as provas finais'
,'Ele teria me contado'
,'que você teria feito?'
,'Teria sido divertido'
,'Nós teríamos ajudado eles'
,'Nós jamais teríamos permitido isso'
,'Eu jamais teria conhecido você'
,'Ela jamais teria deixado aquilo acontecer'
,'O resultado mais provável'
,'Os ingressos provavelmente serão caros'
,'Eu acho que provavelmente vai chover hoje de tarde'
,'É improvável, mas não completamente impossível, creio eu'
,'Eu fui solicitado a coletar dados estatísticos que pudessem ser úteis futuramente'
,'Essa é uma grande invenção, mas um produto comercializável está muitos anos no futuro'
,'Por que se preocupar com algo que está 10 anos no futuro?'
,'Qual porta leva ao jardim?'
,'Comer muito açúcar pode levar a problemas de saúde'
,'O que te levou a esta conclusão?'
,'Por favor esteja ciente de que esta pesquisa leva você para fora do site da Wikipedia'
,'Um pouco adiante, ele leva você para fora da trilha principal'
,'Um casaco muito usado'
,'Uma frase muito usada'



,'Eu não tinha nenhum dinheiro porque eu tinha perdido a minha carteira'
,'George tinha consertado muitos caros antes de receber dua licença de mecânico'
,'Ela não queria se mudar. Ela tinha morado em Liverpool toda sua vida'
,'Nós dois vamos ao mercado'
,'Dois de nós vamos ao mercado'
,'Entre todos os dez de nós, dois vão ao mercado e o resto não'
,'Libertar um prisioneiro'
,'Lançar um filme'
,'Os bombeiros levaram duas horas para tirar o motorista dos destroços'
,'Ele se recusou a soltar o braço dela'
,'10.000 balões foram soltos na cerimônia'
,'Ela completa 21 anos em'
,'O clima ficou frio'
,'As folhas ficam vermelhas no outono'
,'Ela ficou do lado do amigo dela na discussão'
,'Eles traíram a nação e ficaram do lado do inimigo'
,'Eles ficaram contra mim'
,'Eu tenho certeza de que com o tempo nós teremos sucesso'
,'Ela espera arrumar um trabalho no jornal local e com o tempo trabalhar para o The Times'
,'Depois de um tempo nosso voo partiu cinco horas atrasado'
,'Ele saiu de casa após desentender-se com seus'
,'Um desentendimento entre membros da família'
,'Ela tinha se desentendido com o namorado a respeito da ex-namorada dele'
,'Por favor não me desaponte'
,'Desculpe-me por ter te desapontado'
,'Eu não quero te desapontar, mas eu não posso te apoiar na eleição'
,'Ela não estava contente com nosso trabalho e nos fez começar de novo'
,'Desculpe-me, mas você terá que começar de novo'
,'Desculpe-me, mas você terá que começar tudo de novo'
,'Ela viu o divórcio como uma oportunidade de começar de novo'
,'Tente novamente e não estrague as coisas desta vez'
,'realmente complicou as coisas para o meu irmão não chegando a tempo'
,'Mais uma mancada como essa e você está demitido'



,'Quem vai estar lá?'
,'Ela ficará bem'
,'O que nós vamos fazer agora?'
,'Eu não recebi meu pedido'
,'Nós não encontramos nenhum alienígena'
,'Não diga que você não foi avisado'
,'Você está pronto? Não, ainda não'
,'Eu não li o livro ainda'
,'As sugestões deles não serão implementadas, pelo menos não ainda'
,'Eu tomei uma pílula para ajudar a acalmar meus nervos'
,'Isso deverá acalmar seu estômago'
,'Ela bebeu para acalmar seus nervos'
,'Assim como todas as coisas, é melhor começar com o básico'
,'Assim como a maioria dos homens, é mais fácil para mim dar abraços do que aceitá-los'
,'Assim como muitas doenças mentais, as causas da esquizofrenia são muito mal entendidas'
,'A bola rolou e rolou'
,'Os anos se passaram, um a um'
,'Conforme as horas se passaram, eu aprendi simplesmente o quão entediado eu podia ficar sem ir dormir'
,'O primeiro dia de aula foi mais ou menos assim'
,'Meu verão foi mais ou menos assim'
,'Meu dia foi mais ou menos assim'
,'cerimônia estava prestes a começar'
,'Ele está de pé na borda, e eu acho que ele está prestes a pular'
,'Você não vai acreditar no que eu estou prestes a lhe contar'
,'Todas as ilusões desaparecem'
,'Como deixar suas antigas crenças limitantes desaparecerem'
,'Até eu desaparecer'
,'Eles ganharam seis jogos em sequência'
,'Eu não faço uma boa refeição há três dias seguidos'
,'As crianças ficaram numa fila na parede'



,'Eu nem mesmo sei'
,'Ele nunca nem mesmo abriu a carta'
,'Há muitos erros de ortografia, ainda assim, é um ensaio muito bom'
,'Eu sou mais velho do que ela'
,'Nós não devemos gastar mais do que ganhamos'
,'Uma multidão de mais de 10000 tinha se reunido'
,'Ela queria colocar seus negócios em ordem antes de morrer'
,'Lidando com os négocios de outra pessoa'
,'Como eu gasto meu dinheiro só diz respeito a mim'
,'Como eu decido viver diz repeito a mim, não a você'
,'O que esta sentença quer dizer?'
,'Tudo depende do que você quer dizer com a palavra livre'
,'O olhar na rosto dela significava somente um coisa: problema'
,'Poucas pessoas entendem a diferença'
,'Eu preciso de algumas coisas da loja'
,'Eu procuro visitar meus pais de poucas em poucas semanas'
,'Tudo planejado'
,'Uma das empresas mais organizadas no setor'
,'Próxima missão em Marte da NASA totalmente preparada para o lançamento'
,'Nós comemos arroz todos os dias'
,'O desemprego é o fator mais importante nas crescentes taxas de criminalidade'
,'O tabaco é a maior indústria no estado'
,'Eu vou esvaziar os armários amanhã'
,'Remover dados inúteis em um Mac'
,'Alguns lindos prédios antigos foram destruídos para abrir espaço para o novo estacionamento'
,'Pediram a nós que abrisse espaço para a noiva e o noivo'
,'A maioria dos prédios antigos foram destruídos para hotéis e escritórios'
,'Por favor remova os brinquedos das crianças'
,'Você poderia remover as louças?'
,'Uma moça jovem retirou todos os copos vazios'



,'Por que gastar dinheiro em roupas que você não precisa? '
,'Você está gastando seu tempo tentando explicar isso para ele'
,'Apresse-se! Não há tempo a perder!'
,'Nós colocamos armadilhas no sótão para os ratos'
,'Eles estavam presos no prédio em chamas'
,'Eu me sinto aprisionado no meu trabalho'
,'ruído do trem passando abafou nossa conversa'
,'barulho da máquina de gelo abafou a música'
,'Grandes mentiras abafam a verdade'
,'Ilustrações grandes e coloridas dão vida à clássica história da Branca de Neve'
,'Um pouco de canto e dança teriam dado vida à peça'
,'Um pouco de café lhe dará ânimo'
,'Mais ou menos como um sonho'
,'Eles são mais ou menos como nós'
,'É mais ou menos como a loteria; quanto mais pessoas jogam, maior fica o pote, até que alguém ganhe'
,'Quando a oportunidade certa aparecer, ela vai pegar'
,'Ele decidiu dar dinheiro para o primeiro desconhecido que apareceu'
,'Eu estou feliz que você veio junto'
,'A polícia publicou um alerta sobre um prisioneiro fugitivo'
,'A maioria das coisas que eles publicam não vale a pena assistir'
,'A fábrica produz 4000 unidades por dia'
,'A recomendação do médico é deixar a febre passar naturalmente'
,'Eu tive que aceitar que o relacionamento tinha chegado ao fim'
,'O médico disse que o resfriado iria provavelmente terminar naturalmente dentro de uma semana'
,'Sempre que você encontrar a si mesmo no lado da maioria'
,'Se você encontrar a si mesmo pensando'
,'Encontrar a si mesmo em uma situação difícil'
,'Nós nos abrigamos abaixo de um enorme carvalho'
,'Eles dormiram na rua sob as estrelas'
,'Logo abaixo da superfície da água'



,'Eu tenho quase certeza que eu vou'
,'O jogo foi muito bom'
,'É bem difícil de explicar'
,'Ela usou a abordagem errada em suas negociações com eles'
,'Qual é a melhor maneira de abordar este problema? '
,'Nós ouvimos o som de um carro se aproximando'
,'Trabalhe em busca de um objetivo, não um salário'
,'As maiores armadilhas de objetivos de longo prazo'
,'Nosso maior objetivo precisa ser a preservação do ambiente'
,'Ele passou o dia todo escrevendo'
,'Nós bebemos uma garrafa inteira cada um'
,'Um restaurante de comida integral'
,'A discussão focou em três problemas principais'
,'Cada exercício foca em um ponto gramatical diferente'
,'Nós manteremos o nosso foco nas necessidades dos clientes'
,'Ela colocou a câmera no automático'
,'Ajuste o alarme para as 7 horas'
,'Eles não definiram uma data para o casamento ainda'
,'Na maioria das vezes'
,'11 coisas em que a maioria de nós acreditamos'
,'Nós ficaremos em Paris somente um dia, então vamos aproveitar o máximo'
,'Mais uma pergunta e acabou'
,'Desligue a luz quando terminar'
,'Se você terminou aquela revista, eu posso dar uma olhada nela?'
,'Este princípio forma a base das políticas econômicas do país'
,'Eles a contrataram temporariamente'
,'A empresa muda seu website diariamente'
,'A busca da felicidade'
,'Ela viajou o mundo em busca de seus sonhos'
,'Ele faria qualquer coisa em busca de riqueza e fama'



,'O filme é baseado em um acontecimento da vida real'
,'Uma sociedade baseada em classes'
,'Uma empresa sediada em Chicago'
,'Desculpe-me, senhor, mas não é permitido fumar'
,'Eu não tenho permissão dirigir o carro do meu pai'
,'Infelizmente, eles não me deixaram explicar o raciocínio por trás da minha decisão'
,'Cada resposta vale 20 pontos'
,'Vermelho ou azul? Eu vou querer um de cada, por favor'
,'Cada um de nós tem seu próprio carro'
,'chances estão muito a nosso favor'
,'As chances estão muito contra ele'
,'Contra todas as chances, ele se recuperou completamente'
,'Nós precisamos abordar o problema de um ponto de vista diferente'
,'Este é um ponto de vista puramente teórico, que não tem base na realidade'
,'Ele está escrevendo do ponto de vista de alguém que sabe como é a vida na prisão'
,'Você está disposto a dedicar o tempo e o esforço necessários para chegar ao sucesso?'
,'Eles devem ter trabalhado muito para chegar a uma exposição tão interessante'
,'Ele está se dedicando muito para aprimorar seu francês'
,'Eu vou anunciar o clima aos passageiros logo que nós decolarmos'
,'Muito mais dinheiro será necessário para começar este projeto'
,'Casey e seu amigo tentaram começar uma banda, mas nunca deu certo'
,'O estresse faz com que o seu corpo libere substâncias químicas, as quais por sua vez aumentam a pressão sanguínea'
,'A mãe dela a ensinou, e ela por sua vez ensinou a própria filha'
,'Ele falou com cada um dos convidados em turnos'
,'No final das contas, você terá que tomar a decisão por conta própria'
,'No final das contas, é uma questão de quem é mais popular'
,'As mudanças no final das contas se provaram desnecessárias'
,'Ela por acaso estava fora de casa quando nós ligamos'
,'Você por acaso não sabe o nome dele, sabe?'
,'A porta por acaso estava destravada'



,'Talvez ele venha, talvez ele não'
,'Talvez seria melhor se você voltasse amanhã'
,'Uma mudança poderia afetar possivelmente 20% da população'
,'Ele levou as crianças para a Disneylândia'
,'Quantos filhos você tem?'
,'Eu costumava chorar muito quando eu era criança'
,'Custará pelo menos 500 dólares'
,'Corte a grama pelo menos uma vez por semana no verão'
,'Você poderia pelo menos escutar o que ele diz'
,'Certifique-se de adicionar a quantidade certa de sal'
,'O servidor é projetado para armazenar grandes quantidades de dados'
,'Há um tanto de verdade no que você diz'
,'Ela usou um tripé para manter a câmera firme'
,'As exportações da empresa vem crescendo consistentemente'
,'Os salários aumentaram consistentemente'
,'Ela parecia feliz'
,'O que eles estão fazendo não parece correto para mim'
,'Parecia uma boa ideia na época'
,'Eu não sei o que de fato aconteceu'
,'Eu não achei que gostaria do filme, mas foi de fato muito bom'
,'Eu fiquei chocado ao saber que ele realmente era capaz de pilotar um avião'
,'Uma infância dura/difícil'
,'Pode ser difícil tentar conciliar carreira e família'
,'Você acha que é durão, não acha?'
,'Os seguranças abriram caminho através da multidão'
,'Ele dormiu durante o filme'
,'Você só consegue chegar ao sucesso através do trabalho duro'
,'É exatamente o que eu queria'
,'Eu acabei de ouvir as notícias'
,'Ela era só um bebê quando o pai partiu para a guerra'



,'A propósito, eu encontrei aquele livro que você estava procurando'
,'Que horas são, falando nisso?'
,'Falando nisso, você ficou sabendo do que aconteceu hoje?'
,'Não parece certo'
,'Ele parecia que tinha corrido uma maratona'
,'A entrevista durou somente dez minutos, mas pareceu horas'
,'Eu vou mesmo que talvez chova'
,'Eu gosto dela, mesmo ela sendo irritante às vezes'
,'Mesmo eu tendo um diploma mestrado em administração de negócios, eu não sei preencher minha declaração de impostos'
,'Quanto mais você dá, mais você recebe'
,'Quanto mais dinheiro doado, mais livros são comprados e mais crianças ficam felizes'
,'Quando mais corretos os estágios iniciais do treinamento, menores são as changes das coisas darem errado'
,'Quebre o chocolate em pedaços para que todos podem comer um pouco'
,'Ela deixou o prato cair e ele quebrou em pedaços'
,'Ela caiu de uma escada e quebrou o braço'
,'Usando a Internet você pode fazer compras de casa'
,'Ele começou o discurso agradecendo o Presidente e finalizou contando uma piada'
,'Ligue pressionando este botão'
,'Você talvez queira abandonar a escola agora, mas no longo prazo, você se arrependerá'
,'Isso quer dizer gastar um pouco agora, mas no longo prazo isso nos economizará muito dinheiro'
,'Embora os preços possam subir no curto prazo, eles deverão começar a cair novamente no final do ano'
,'Estes mistérios não pode ser solucionados por meros mortais como nós'
,'Meros 2% do orçamento eles foi gasto em publicidade'
,'Você conseguiu o emprego. A entrevista será uma mera formalidade'



,'Eu costumava morar em Londres'
,'Nós costumávamos velejar no lago durante o verão'
,'Eu não costumava gostar muito dele quando estávamos na escola'
,'Um país lutando por independência'
,'Eles tiveram dificudlades até para pagar as contas'
,'Os dois homens lutaram pelo controle do grupo'
,'Construir um motor para funcionar comcarvão é impressionante'
,'Carros funcionam com gasolina'
,'Jovem rapaz, esse motor não vai nem funcionar com óleo diesel'
,'Você receberá uma lista de fatos'
,'O conselho recebeu uma proposta do Reino Unido'
,'Clique em Download quando lhe for oferecida essa opção'
,'Por favor, pare de fumar'
,'Ele deliberadamente se absteve de expressar sua opinião'
,'Eu ia fazer uma piada, but preferi ficar calado'
,'Deveria haver uma marcação para atestar a segurança do produto'
,'Medalhas olímpicas comprovam nosso desempenho na piscina'
,'Eu posso confirmar a verdade da declaração dele'
,'Algumas regiões do país também são propensas a desastres naturais'
,'Um atleta propenso a se lesionar'
,'Até os carros mais luxuosos estão propensos a ruídos excessivos'
,'Eu me senti levemente deprimido'
,'Algumas das histórias eram levemente divertidas'
,'Ele tem apenas um leve interesse em política'
,'Ela vem tentando ganhar pesso na academia'
,'A maior parte da população vive nas cidades'
,'Apesar de sua massa e peso, o carro é extremamente veloz'
,'Você pode estacionar em ambos os lados da rua'
,'Há dois tipos de qualificação, ambos são aceitos'
,'O Pete não pode ir e eu também não'



,'Eu escovo meus dentes logo de manhã cedo'
,'A primeira coisa que eu fiz de manhã foi ligar para eles'
,'Todo dia Sara me liga logo de manhã cedo'
,'Isso me fez me sentir meio estúpido'
,'É meio estranho o jeito que ele fala'
,'A faculdade é meio como uma preparação para o mundo adulto'
,'Quando nós chegamos, os convidados já estavam lá'
,'Quando a primavera chegar, ela terá ido embra'
,'Na hora que escurecer'
,'Os suprimentos alimentares estavam severamente esgotados'
,'O solo foi esgotado por anos de seca'
,'Guerras na região esgotaram os suprimentos alimentares do país'
,'Eu estava tão cansado que fui direto para a cama'
,'Eu irei direto ao ponto – seu trabalho não é bom o bastante'
,'Eles não estão sendo diretos com você'
,'Não podemos lidar com isso agora em vez de amanhã?'
,'Ela escolheu ele em vez de mim'
,'Em vez de dirigir, eu peguei um ônibus'
,'Deixe-me só recapitular o que nós decidimos até agora'
,'Ao final de cada episódio havia uma recapitulação rápida de pontos importantes'
,'No final do programa, o apresentador recapitulou as notícias do dia'
,'Certifique-se de desligar o forno'
,'Lembre-se de garantir que todas as portas estejam trancadas'
,'Garanta que isso não aconteça de novo'
,'Ela corre um pouco mais (longe) todos os dias para aumentar a resistência'
,'Ele vem tentando acumular coragem para falar com ela'
,'Ele tinha ficado fora por várias semanas e o pó tinha acumulado em todos os móveis'
,'Aqueles são bons, mas eu gosto mais desses'
,'As partes de alumínio são muito mais leves do que aquelas feitas de aço'
,'Há aqueles que pensam que ela devia renunciar'
];

const R2 =[
''  
,''
,'teve um erro'
,''
,''
,''
,''
,''
,'foi escrito nas estrelas'
,''
,''
,''
,''
,''
,''
,''
,'Vá e veja por conta própria'
,''
,'Eu achei que eu estava sonhando'
,'E você achou que dragões não existiam'
,'Ele achou que tinha ganhado'
,''
,''
,''
,''
,''
,''
,''
,''
,''



,''  
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'De modo para que nós possamos vencer'
,'De modo para que você possa ir embora'
,'De modo que você possa usar isso novamente'


,''  
,''
,''
,'Ajuste o alarme para 5 AM e então vá para a cama'
,''
,'Nós sentamos na mesa e depois nos movemos para o bar'
,''
,''
,''
,''
,''
,'Aqueles que nos protegeram'
,''
,''
,'Eu dediquei muito tempo a isso'
,''
,''
,''
,''
,'leve o tempo que precisar, não estamos com pressa'
,'Ele teve que ir embora correndo'
,''
,''
,''
,''
,''
,''
,''
,''
,''



,''  
,''
,''
,''
,''
,''
,'Ela teve uma brilhante ideia'
,'Eles tentaram inventar uma solução'
,''
,'Nós chegaremos em casa logo'
,'Ela vendeu a casa logo depois que o marido dela morreu'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'Eu não consegui cumprir a promessa'
,''
,''
,'Eu vou fazer o meu melhor'
,''
,''
,''
,''
,''



,''  
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'Eles vão fazer tudo que eles conseguem'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''



,''  
,''
,''
,''
,''
,''
,''
,'Não faça quaisquer movimentos bruscos'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'Ele poderia ter vencido'
,''
,''
,'Dois períodos de estudo com uma pequena pausa entre eles'
,''
,''
,''
,''



,''
,''
,''
,''
,''
,'Eu estava refletindo sobre o melhor local para um feriado'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'A jaqueta dele estava coberta com marcas de lama'
,''
,'Martin estava mentindo o tempo todo. Eu deveria saber'
,'Ainda não se sabe qual foi a causa do incêndio'
,'Você pode descobrir que horas a reunião começa?'
,''
,''



,''
,''
,''
,''
,''
,''
,'Importa'
,'Não importa'
,'Faz sentido'
,'Não faz sentido'
,'Funciona'
,'Não funciona'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'Você gostaria de jogar? Não obrigado, eu vou só assistir'
,''
,''
,''
,''
,''



,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'Por quanto tempo você acha que o Jason irá ficar desta vez?'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'Eu não quis dizer isso, isso simplesmente saiu'
,'Ele abriu a caixa, e um rato apareceu'
,''
,''
,''
,''
,''
,''
,''



,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'Você consegue descobrir este enigma?'
,'As coisas ocorreram de uma maneira interessante'
,''
,'Tudo ocorreu bem'
,'O cachorro deles morreu, mas eles planejam pegar outro'
,'Você deveria vestir o azul. Aquele com as listras? Não, o outro'
,''
,''
,'Quando meu amigo ainda vivia aqui, nós almoçávamos juntos todos os dias'
,''
,'teatro'
,''
,''
,'acabar em problemas'
,''
,'Você pode considerar sua doença difícil de aceitar'
,''



,''
,''
,'Uma vez que você não está interessado, eu não vou lhe contar sobre isso'
,''
,''
,''
,''
,'Nós preciamos impedir ele de ver ela de algum modo'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'É improvável, mas não completamente impossível, eu suponho'
,''
,'Essa é uma grande invenção, mas ainda estamos há muitos anos de um produto comercializável'
,'Por que se preocupar com algo que só ocorrerá daqui a 10 anos?'
,''
,''
,''
,''
,''
,''
,''



,''
,''
,''
,''
,''
,'Entre nós dez, dois vão ao mercado, o resto não vai'
,''
,'publicar um filme'
,''
,''
,''
,''
,'O clima tornou-se frio'
,'As folhas tornam-se vermelhas no outono'
,''
,'Eles traíram a o país deles e ficaram do lado do inimigo'
,'ambos ficaram contra mim'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''



,''
,'ela estará OK'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''



,''
,''
,'Há muitos erros de ortografia, ainda assim, é uma dissertação muito boa'
,''
,''
,'Uma multidão de mais de 10000 tinha se juntado'
,'Ela queria colocar suas coisas em ordem antes de morrer'
,'Lidando com as coisas de outra pessoa'
,'Como eu gasto meu dinheiro é minha decisão'
,'Como eu decido viver é minha decisão, não sua'
,'O que esta frase quer dizer?'
,''
,'A expressão na rosto dela significava somente um coisa: problema'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'Pediram a nós fomos solicitados a abrir espaço para a noiva e o noivo'
,'A maioria dos prédios antigos foram destruídos para abrir espaço para hotéis e escritórios'
,''
,''
,''



,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'A fábrica produz 4000 unidades a cada dia'
,''
,''
,''
,'Sempre que você estiver no lado da maioria'
,'Se você encontrar estiver pensando'
,'estar em uma situação difícil'
,''
,''
,''



,''
,''
,''
,''
,''
,''
,''
,'As maiores ciladas de objetivos de longo prazo'
,'Nosso supremo objetivo precisa ser a preservação do ambiente'
,''
,''
,''
,''
,''
,''
,''
,''
,'Eles não definiram uma data para o casamento deles ainda'
,''
,''
,''
,'Mais uma pergunta e terminamos'
,''
,''
,''
,''
,''
,''
,''
,''



,''
,''
,''
,''
,'Eu não tenho não posso dirigir o carro do meu pai'
,''
,''
,''
,''
,''
,'As chances estão pesadamente contra ele'
,''
,''
,''
,''
,''
,''
,''
,''
,'Muito mais dinheiro será necessário para lançar este projeto'
,'Casey e seu amigo tentaram começar uma banda, mas nunca saiu do papel'
,''
,''
,'Ele falou com cada um dos convidados um após a outro'
,''
,''
,''
,''
,''
,''



,'Talvez ele venha, talvez ele não venha'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''



,''
,''
,''
,'Não parece correto'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'Usando a Internet você pode fazer compras sem sair de casa'
,''
,'Ligue isso pressionando este botão'
,''
,''
,''
,''
,''
,''



,''
,''
,''
,''
,''
,'Os dois homens lutaram pelo controle do partido'
,''
,''
,''
,''
,''
,''
,'Por favor, se abstenha de fumar'
,''
,'Eu ia fazer uma piada, but preferi me abstive'
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''



,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,''
,'existem aqueles que pensam que ela devia renunciar'
];

const VIDEO =[
'VB_VIDEO_01'  
,'VB_VIDEO_02'
,'VB_VIDEO_03'
,'VB_VIDEO_04'
,'VB_VIDEO_05'
,'VB_VIDEO_06'
,'VB_VIDEO_07'
,'VB_VIDEO_08'
,'VB_VIDEO_09'
,'VB_VIDEO_10'
,'VB_VIDEO_11'
,'VB_VIDEO_12'
,'VB_VIDEO_13'
,'VB_VIDEO_14'
,'VB_VIDEO_15'
,'VB_VIDEO_16'
,'VB_VIDEO_17'
,'VB_VIDEO_18'
,'VB_VIDEO_19'
,'VB_VIDEO_20'
,'VB_VIDEO_21'
,'VB_VIDEO_22'
,'VB_VIDEO_23'
,'VB_VIDEO_24'
,'VB_VIDEO_25'
,'VB_VIDEO_26'
,'VB_VIDEO_27'
,'VB_VIDEO_28'
,'VB_VIDEO_29'
,'VB_VIDEO_30'



,'VB2_VIDEO_01'  
,'VB2_VIDEO_02'
,'VB2_VIDEO_03'
,'VB2_VIDEO_04'
,'VB2_VIDEO_05'
,'VB2_VIDEO_06'
,'VB2_VIDEO_07'
,'VB2_VIDEO_08'
,'VB2_VIDEO_09'
,'VB2_VIDEO_10'
,'VB2_VIDEO_11'
,'VB2_VIDEO_12'
,'VB2_VIDEO_13'
,'VB2_VIDEO_14'
,'VB2_VIDEO_15'
,'VB2_VIDEO_16'
,'VB2_VIDEO_17'
,'VB2_VIDEO_18'
,'VB2_VIDEO_19'
,'VB2_VIDEO_20'
,'VB2_VIDEO_21'
,'VB2_VIDEO_22'
,'VB2_VIDEO_23'
,'VB2_VIDEO_24'
,'VB2_VIDEO_25'
,'VB2_VIDEO_26'
,'VB2_VIDEO_27'
,'VB2_VIDEO_28'
,'VB2_VIDEO_29'
,'VB2_VIDEO_30'
];

AUDIO =[
'VB01AUDIO-01'  
,'VB01AUDIO-02'
,'VB01AUDIO-03'
,'VB01AUDIO-04'
,'VB01AUDIO-05'
,'VB01AUDIO-06'
,'VB01AUDIO-07'
,'VB01AUDIO-08'
,'VB01AUDIO-09'
,'VB01AUDIO-10'
,'VB01AUDIO-11'
,'VB01AUDIO-12'
,'VB01AUDIO-13'
,'VB01AUDIO-14'
,'VB01AUDIO-15'
,'VB01AUDIO-16'
,'VB01AUDIO-17'
,'VB01AUDIO-18'
,'VB01AUDIO-19'
,'VB01AUDIO-20'
,'VB01AUDIO-21'
,'VB01AUDIO-22'
,'VB01AUDIO-23'
,'VB01AUDIO-24'
,'VB01AUDIO-25'
,'VB01AUDIO-26'
,'VB01AUDIO-27'
,'VB01AUDIO-28'
,'VB01AUDIO-29'
,'VB01AUDIO-30'


,'VB02AUDIO-01'  
,'VB02AUDIO-02'
,'VB02AUDIO-03'
,'VB02AUDIO-04'
,'VB02AUDIO-05'
,'VB02AUDIO-06'
,'VB02AUDIO-07'
,'VB02AUDIO-08'
,'VB02AUDIO-09'
,'VB02AUDIO-10'
,'VB02AUDIO-11'
,'VB02AUDIO-12'
,'VB02AUDIO-13'
,'VB02AUDIO-14'
,'VB02AUDIO-15'
,'VB02AUDIO-16'
,'VB02AUDIO-17'
,'VB02AUDIO-18'
,'VB02AUDIO-19'
,'VB02AUDIO-20'
,'VB02AUDIO-21'
,'VB02AUDIO-22'
,'VB02AUDIO-23'
,'VB02AUDIO-24'
,'VB02AUDIO-25'
,'VB02AUDIO-26'
,'VB02AUDIO-27'
,'VB02AUDIO-28'
,'VB02AUDIO-29'
,'VB02AUDIO-30'


,'VB03AUDIO-01' 
,'VB03AUDIO-02'
,'VB03AUDIO-03'
,'VB03AUDIO-04'
,'VB03AUDIO-05'
,'VB03AUDIO-06'
,'VB03AUDIO-07'
,'VB03AUDIO-08'
,'VB03AUDIO-09'
,'VB03AUDIO-10'
,'VB03AUDIO-11'
,'VB03AUDIO-12'
,'VB03AUDIO-13'
,'VB03AUDIO-14'
,'VB03AUDIO-15'
,'VB03AUDIO-16'
,'VB03AUDIO-17'
,'VB03AUDIO-18'
,'VB03AUDIO-19'
,'VB03AUDIO-20'
,'VB03AUDIO-21'
,'VB03AUDIO-22'
,'VB03AUDIO-23'
,'VB03AUDIO-24'
,'VB03AUDIO-25'
,'VB03AUDIO-26'
,'VB03AUDIO-27'
,'VB03AUDIO-28'
,'VB03AUDIO-29'
,'VB03AUDIO-30'

,'VB04AUDIO-01'  
,'VB04AUDIO-02'
,'VB04AUDIO-03'
,'VB04AUDIO-04'
,'VB04AUDIO-05'
,'VB04AUDIO-06'
,'VB04AUDIO-07'
,'VB04AUDIO-08'
,'VB04AUDIO-09'
,'VB04AUDIO-10'
,'VB04AUDIO-11'
,'VB04AUDIO-12'
,'VB04AUDIO-13'
,'VB04AUDIO-14'
,'VB04AUDIO-15'
,'VB04AUDIO-16'
,'VB04AUDIO-17'
,'VB04AUDIO-18'
,'VB04AUDIO-19'
,'VB04AUDIO-20'
,'VB04AUDIO-21'
,'VB04AUDIO-22'
,'VB04AUDIO-23'
,'VB04AUDIO-24'
,'VB04AUDIO-25'
,'VB04AUDIO-26'
,'VB04AUDIO-27'
,'VB04AUDIO-28'
,'VB04AUDIO-29'
,'VB04AUDIO-30'

,'VB05AUDIO-01'  
,'VB05AUDIO-02'
,'VB05AUDIO-03'
,'VB05AUDIO-04'
,'VB05AUDIO-05'
,'VB05AUDIO-06'
,'VB05AUDIO-07'
,'VB05AUDIO-08'
,'VB05AUDIO-09'
,'VB05AUDIO-10'
,'VB05AUDIO-11'
,'VB05AUDIO-12'
,'VB05AUDIO-13'
,'VB05AUDIO-14'
,'VB05AUDIO-15'
,'VB05AUDIO-16'
,'VB05AUDIO-17'
,'VB05AUDIO-18'
,'VB05AUDIO-19'
,'VB05AUDIO-20'
,'VB05AUDIO-21'
,'VB05AUDIO-22'
,'VB05AUDIO-23'
,'VB05AUDIO-24'
,'VB05AUDIO-25'
,'VB05AUDIO-26'
,'VB05AUDIO-27'
,'VB05AUDIO-28'
,'VB05AUDIO-29'
,'VB05AUDIO-30'
,'VB05AUDIO-31'


,'VB06AUDIO-01'  
,'VB06AUDIO-02'
,'VB06AUDIO-03'
,'VB06AUDIO-04'
,'VB06AUDIO-05'
,'VB06AUDIO-06'
,'VB06AUDIO-07'
,'VB06AUDIO-08'
,'VB06AUDIO-09'
,'VB06AUDIO-10'
,'VB06AUDIO-11'
,'VB06AUDIO-12'
,'VB06AUDIO-13'
,'VB06AUDIO-14'
,'VB06AUDIO-15'
,'VB06AUDIO-16'
,'VB06AUDIO-17'
,'VB06AUDIO-18'
,'VB06AUDIO-19'
,'VB06AUDIO-20'
,'VB06AUDIO-21'
,'VB06AUDIO-22'
,'VB06AUDIO-23'
,'VB06AUDIO-24'
,'VB06AUDIO-25'
,'VB06AUDIO-26'
,'VB06AUDIO-27'
,'VB06AUDIO-28'
,'VB06AUDIO-29'
,'VB06AUDIO-30'

,'VB07AUDIO-01'  
,'VB07AUDIO-02'
,'VB07AUDIO-03'
,'VB07AUDIO-04'
,'VB07AUDIO-05'
,'VB07AUDIO-06'
,'VB07AUDIO-07'
,'VB07AUDIO-08'
,'VB07AUDIO-09'
,'VB07AUDIO-10'
,'VB07AUDIO-11'
,'VB07AUDIO-12'
,'VB07AUDIO-13'
,'VB07AUDIO-14'
,'VB07AUDIO-15'
,'VB07AUDIO-16'
,'VB07AUDIO-17'
,'VB07AUDIO-18'
,'VB07AUDIO-19'
,'VB07AUDIO-20'
,'VB07AUDIO-21'
,'VB07AUDIO-22'
,'VB07AUDIO-23'
,'VB07AUDIO-24'
,'VB07AUDIO-25'
,'VB07AUDIO-26'
,'VB07AUDIO-27'
,'VB07AUDIO-28'
,'VB07AUDIO-29'
,'VB07AUDIO-30'

,'VB08AUDIO-01'  
,'VB08AUDIO-02'
,'VB08AUDIO-03'
,'VB08AUDIO-04'
,'VB08AUDIO-05'
,'VB08AUDIO-06'
,'VB08AUDIO-07'
,'VB08AUDIO-08'
,'VB08AUDIO-09'
,'VB08AUDIO-10'
,'VB08AUDIO-11'
,'VB08AUDIO-12'
,'VB08AUDIO-13'
,'VB08AUDIO-14'
,'VB08AUDIO-15'
,'VB08AUDIO-16'
,'VB08AUDIO-17'
,'VB08AUDIO-18'
,'VB08AUDIO-19'
,'VB08AUDIO-20'
,'VB08AUDIO-21'
,'VB08AUDIO-22'
,'VB08AUDIO-23'
,'VB08AUDIO-24'
,'VB08AUDIO-25'
,'VB08AUDIO-26'
,'VB08AUDIO-27'
,'VB08AUDIO-28'
,'VB08AUDIO-29'
,'VB08AUDIO-30'

,'VB09AUDIO-01'  
,'VB09AUDIO-02'
,'VB09AUDIO-03'
,'VB09AUDIO-04'
,'VB09AUDIO-05'
,'VB09AUDIO-06'
,'VB09AUDIO-07'
,'VB09AUDIO-08'
,'VB09AUDIO-09'
,'VB09AUDIO-10'
,'VB09AUDIO-11'
,'VB09AUDIO-12'
,'VB09AUDIO-13'
,'VB09AUDIO-14'
,'VB09AUDIO-15'
,'VB09AUDIO-16'
,'VB09AUDIO-17'
,'VB09AUDIO-18'
,'VB09AUDIO-19'
,'VB09AUDIO-20'
,'VB09AUDIO-21'
,'VB09AUDIO-22'
,'VB09AUDIO-23'
,'VB09AUDIO-24'
,'VB09AUDIO-25'
,'VB09AUDIO-26'
,'VB09AUDIO-27'
,'VB09AUDIO-28'
,'VB09AUDIO-29'
,'VB09AUDIO-30'
,'VB09AUDIO-31'

,'VB10AUDIO-01'  
,'VB10AUDIO-02'
,'VB10AUDIO-03'
,'VB10AUDIO-04'
,'VB10AUDIO-05'
,'VB10AUDIO-06'
,'VB10AUDIO-07'
,'VB10AUDIO-08'
,'VB10AUDIO-09'
,'VB10AUDIO-10'
,'VB10AUDIO-11'
,'VB10AUDIO-12'
,'VB10AUDIO-13'
,'VB10AUDIO-14'
,'VB10AUDIO-15'
,'VB10AUDIO-16'
,'VB10AUDIO-17'
,'VB10AUDIO-18'
,'VB10AUDIO-19'
,'VB10AUDIO-20'
,'VB10AUDIO-21'
,'VB10AUDIO-22'
,'VB10AUDIO-23'
,'VB10AUDIO-24'
,'VB10AUDIO-25'
,'VB10AUDIO-26'
,'VB10AUDIO-27'
,'VB10AUDIO-28'
,'VB10AUDIO-29'
,'VB10AUDIO-30'
,'VB10AUDIO-31'

,'VB11AUDIO-01'  
,'VB11AUDIO-02'
,'VB11AUDIO-03'
,'VB11AUDIO-04'
,'VB11AUDIO-05'
,'VB11AUDIO-06'
,'VB11AUDIO-07'
,'VB11AUDIO-08'
,'VB11AUDIO-09'
,'VB11AUDIO-10'
,'VB11AUDIO-11'
,'VB11AUDIO-12'
,'VB11AUDIO-13'
,'VB11AUDIO-14'
,'VB11AUDIO-15'
,'VB11AUDIO-16'
,'VB11AUDIO-17'
,'VB11AUDIO-18'
,'VB11AUDIO-19'
,'VB11AUDIO-20'
,'VB11AUDIO-21'
,'VB11AUDIO-22'
,'VB11AUDIO-23'
,'VB11AUDIO-24'
,'VB11AUDIO-25'
,'VB11AUDIO-26'
,'VB11AUDIO-27'
,'VB11AUDIO-28'
,'VB11AUDIO-29'
,'VB11AUDIO-30'

,'VB12AUDIO-01'  
,'VB12AUDIO-02'
,'VB12AUDIO-03'
,'VB12AUDIO-04'
,'VB12AUDIO-05'
,'VB12AUDIO-06'
,'VB12AUDIO-07'
,'VB12AUDIO-08'
,'VB12AUDIO-09'
,'VB12AUDIO-10'
,'VB12AUDIO-11'
,'VB12AUDIO-12'
,'VB12AUDIO-13'
,'VB12AUDIO-14'
,'VB12AUDIO-15'
,'VB12AUDIO-16'
,'VB12AUDIO-17'
,'VB12AUDIO-18'
,'VB12AUDIO-19'
,'VB12AUDIO-20'
,'VB12AUDIO-21'
,'VB12AUDIO-22'
,'VB12AUDIO-23'
,'VB12AUDIO-24'
,'VB12AUDIO-25'
,'VB12AUDIO-26'
,'VB12AUDIO-27'
,'VB12AUDIO-28'
,'VB12AUDIO-29'
,'VB12AUDIO-30'
,'VB12AUDIO-31'
,'VB12AUDIO-32'
,'VB12AUDIO-33'


,'VB13AUDIO-01'  
,'VB13AUDIO-02'
,'VB13AUDIO-03'
,'VB13AUDIO-04'
,'VB13AUDIO-05'
,'VB13AUDIO-06'
,'VB13AUDIO-07'
,'VB13AUDIO-08'
,'VB13AUDIO-09'
,'VB13AUDIO-10'
,'VB13AUDIO-11'
,'VB13AUDIO-12'
,'VB13AUDIO-13'
,'VB13AUDIO-14'
,'VB13AUDIO-15'
,'VB13AUDIO-16'
,'VB13AUDIO-17'
,'VB13AUDIO-18'
,'VB13AUDIO-19'
,'VB13AUDIO-20'
,'VB13AUDIO-21'
,'VB13AUDIO-22'
,'VB13AUDIO-23'
,'VB13AUDIO-24'
,'VB13AUDIO-25'
,'VB13AUDIO-26'
,'VB13AUDIO-27'
,'VB13AUDIO-28'
,'VB13AUDIO-29'
,'VB13AUDIO-30'

,'VB14AUDIO-01'  
,'VB14AUDIO-02'
,'VB14AUDIO-03'
,'VB14AUDIO-04'
,'VB14AUDIO-05'
,'VB14AUDIO-06'
,'VB14AUDIO-07'
,'VB14AUDIO-08'
,'VB14AUDIO-09'
,'VB14AUDIO-10'
,'VB14AUDIO-11'
,'VB14AUDIO-12'
,'VB14AUDIO-13'
,'VB14AUDIO-14'
,'VB14AUDIO-15'
,'VB14AUDIO-16'
,'VB14AUDIO-17'
,'VB14AUDIO-18'
,'VB14AUDIO-19'
,'VB14AUDIO-20'
,'VB14AUDIO-21'
,'VB14AUDIO-22'
,'VB14AUDIO-23'
,'VB14AUDIO-24'
,'VB14AUDIO-25'
,'VB14AUDIO-26'
,'VB14AUDIO-27'
,'VB14AUDIO-28'
,'VB14AUDIO-29'
,'VB14AUDIO-30'


,'VB15AUDIO-01'  
,'VB15AUDIO-02'
,'VB15AUDIO-03'
,'VB15AUDIO-04'
,'VB15AUDIO-05'
,'VB15AUDIO-06'
,'VB15AUDIO-07'
,'VB15AUDIO-08'
,'VB15AUDIO-09'
,'VB15AUDIO-10'
,'VB15AUDIO-11'
,'VB15AUDIO-12'
,'VB15AUDIO-13'
,'VB15AUDIO-14'
,'VB15AUDIO-15'
,'VB15AUDIO-16'
,'VB15AUDIO-17'
,'VB15AUDIO-18'
,'VB15AUDIO-19'
,'VB15AUDIO-20'
,'VB15AUDIO-21'
,'VB15AUDIO-22'
,'VB15AUDIO-23'
,'VB15AUDIO-24'
,'VB15AUDIO-25'
,'VB15AUDIO-26'
,'VB15AUDIO-27'
,'VB15AUDIO-28'
,'VB15AUDIO-29'
,'VB15AUDIO-30'

,'VB16AUDIO-01'  
,'VB16AUDIO-02'
,'VB16AUDIO-03'
,'VB16AUDIO-04'
,'VB16AUDIO-05'
,'VB16AUDIO-06'
,'VB16AUDIO-07'
,'VB16AUDIO-08'
,'VB16AUDIO-09'
,'VB16AUDIO-10'
,'VB16AUDIO-11'
,'VB16AUDIO-12'
,'VB16AUDIO-13'
,'VB16AUDIO-14'
,'VB16AUDIO-15'
,'VB16AUDIO-16'
,'VB16AUDIO-17'
,'VB16AUDIO-18'
,'VB16AUDIO-19'
,'VB16AUDIO-20'
,'VB16AUDIO-21'
,'VB16AUDIO-22'
,'VB16AUDIO-23'
,'VB16AUDIO-24'
,'VB16AUDIO-25'
,'VB16AUDIO-26'
,'VB16AUDIO-27'
,'VB16AUDIO-28'
,'VB16AUDIO-29'
,'VB16AUDIO-30'

,'VB17AUDIO-01'  
,'VB17AUDIO-02'
,'VB17AUDIO-03'
,'VB17AUDIO-04'
,'VB17AUDIO-05'
,'VB17AUDIO-06'
,'VB17AUDIO-07'
,'VB17AUDIO-08'
,'VB17AUDIO-09'
,'VB17AUDIO-10'
,'VB17AUDIO-11'
,'VB17AUDIO-12'
,'VB17AUDIO-13'
,'VB17AUDIO-14'
,'VB17AUDIO-15'
,'VB17AUDIO-16'
,'VB17AUDIO-17'
,'VB17AUDIO-18'
,'VB17AUDIO-19'
,'VB17AUDIO-20'
,'VB17AUDIO-21'
,'VB17AUDIO-22'
,'VB17AUDIO-23'
,'VB17AUDIO-24'
,'VB17AUDIO-25'
,'VB17AUDIO-26'
,'VB17AUDIO-27'
,'VB17AUDIO-28'
,'VB17AUDIO-29'
,'VB17AUDIO-30'

,'VB18AUDIO-01'  
,'VB18AUDIO-02'
,'VB18AUDIO-03'
,'VB18AUDIO-04'
,'VB18AUDIO-05'
,'VB18AUDIO-06'
,'VB18AUDIO-07'
,'VB18AUDIO-08'
,'VB18AUDIO-09'
,'VB18AUDIO-10'
,'VB18AUDIO-11'
,'VB18AUDIO-12'
,'VB18AUDIO-13'
,'VB18AUDIO-14'
,'VB18AUDIO-15'
,'VB18AUDIO-16'
,'VB18AUDIO-17'
,'VB18AUDIO-18'
,'VB18AUDIO-19'
,'VB18AUDIO-20'
,'VB18AUDIO-21'
,'VB18AUDIO-22'
,'VB18AUDIO-23'
,'VB18AUDIO-24'
,'VB18AUDIO-25'
,'VB18AUDIO-26'
,'VB18AUDIO-27'
,'VB18AUDIO-28'
,'VB18AUDIO-29'
,'VB18AUDIO-30'

,'VB19AUDIO-01'  
,'VB19AUDIO-02'
,'VB19AUDIO-03'
,'VB19AUDIO-04'
,'VB19AUDIO-05'
,'VB19AUDIO-06'
,'VB19AUDIO-07'
,'VB19AUDIO-08'
,'VB19AUDIO-09'
,'VB19AUDIO-10'
,'VB19AUDIO-11'
,'VB19AUDIO-12'
,'VB19AUDIO-13'
,'VB19AUDIO-14'
,'VB19AUDIO-15'
,'VB19AUDIO-16'
,'VB19AUDIO-17'
,'VB19AUDIO-18'
,'VB19AUDIO-19'
,'VB19AUDIO-20'
,'VB19AUDIO-21'
,'VB19AUDIO-22'
,'VB19AUDIO-23'
,'VB19AUDIO-24'


,'VB20AUDIO-01'  
,'VB20AUDIO-02'
,'VB20AUDIO-03'
,'VB20AUDIO-04'
,'VB20AUDIO-05'
,'VB20AUDIO-06'
,'VB20AUDIO-07'
,'VB20AUDIO-08'
,'VB20AUDIO-09'
,'VB20AUDIO-10'
,'VB20AUDIO-11'
,'VB20AUDIO-12'
,'VB20AUDIO-13'
,'VB20AUDIO-14'
,'VB20AUDIO-15'
,'VB20AUDIO-16'
,'VB20AUDIO-17'
,'VB20AUDIO-18'
,'VB20AUDIO-19'
,'VB20AUDIO-20'
,'VB20AUDIO-21'
,'VB20AUDIO-22'
,'VB20AUDIO-23'
,'VB20AUDIO-24'
,'VB20AUDIO-25'
,'VB20AUDIO-26'
,'VB20AUDIO-27'
,'VB20AUDIO-28'
,'VB20AUDIO-29'
,'VB20AUDIO-30'

,'VB21AUDIO-01'  
,'VB21AUDIO-02'
,'VB21AUDIO-03'
,'VB21AUDIO-04'
,'VB21AUDIO-05'
,'VB21AUDIO-06'
,'VB21AUDIO-07'
,'VB21AUDIO-08'
,'VB21AUDIO-09'
,'VB21AUDIO-10'
,'VB21AUDIO-11'
,'VB21AUDIO-12'
,'VB21AUDIO-13'
,'VB21AUDIO-14'
,'VB21AUDIO-15'
,'VB21AUDIO-16'
,'VB21AUDIO-17'
,'VB21AUDIO-18'
,'VB21AUDIO-19'
,'VB21AUDIO-20'
,'VB21AUDIO-21'
,'VB21AUDIO-22'
,'VB21AUDIO-23'
,'VB21AUDIO-24'
,'VB21AUDIO-25'
,'VB21AUDIO-26'
,'VB21AUDIO-27'
,'VB21AUDIO-28'
,'VB21AUDIO-29'
,'VB21AUDIO-30'

,'VB22AUDIO-01'  
,'VB22AUDIO-02'
,'VB22AUDIO-03'
,'VB22AUDIO-04'
,'VB22AUDIO-05'
,'VB22AUDIO-06'
,'VB22AUDIO-07'
,'VB22AUDIO-08'
,'VB22AUDIO-09'
,'VB22AUDIO-10'
,'VB22AUDIO-11'
,'VB22AUDIO-12'
,'VB22AUDIO-13'
,'VB22AUDIO-14'
,'VB22AUDIO-15'
,'VB22AUDIO-16'
,'VB22AUDIO-17'
,'VB22AUDIO-18'
,'VB22AUDIO-19'
,'VB22AUDIO-20'
,'VB22AUDIO-21'
,'VB22AUDIO-22'
,'VB22AUDIO-23'
,'VB22AUDIO-24'
,'VB22AUDIO-25'
,'VB22AUDIO-26'
,'VB22AUDIO-27'
,'VB22AUDIO-28'
,'VB22AUDIO-29'
,'VB22AUDIO-30'

,'VB23AUDIO-01'  
,'VB23AUDIO-02'
,'VB23AUDIO-03'
,'VB23AUDIO-04'
,'VB23AUDIO-05'
,'VB23AUDIO-06'
,'VB23AUDIO-07'
,'VB23AUDIO-08'
,'VB23AUDIO-09'
,'VB23AUDIO-10'
,'VB23AUDIO-11'
,'VB23AUDIO-12'
,'VB23AUDIO-13'
,'VB23AUDIO-14'
,'VB23AUDIO-15'
,'VB23AUDIO-16'
,'VB23AUDIO-17'
,'VB23AUDIO-18'
,'VB23AUDIO-19'
,'VB23AUDIO-20'
,'VB23AUDIO-21'
,'VB23AUDIO-22'
,'VB23AUDIO-23'
,'VB23AUDIO-24'
,'VB23AUDIO-25'
,'VB23AUDIO-26'
,'VB23AUDIO-27'
,'VB23AUDIO-28'
,'VB23AUDIO-29'
,'VB23AUDIO-30'

,'VB24AUDIO-01'  
,'VB24AUDIO-02'
,'VB24AUDIO-03'
,'VB24AUDIO-04'
,'VB24AUDIO-05'
,'VB24AUDIO-06'
,'VB24AUDIO-07'
,'VB24AUDIO-08'
,'VB24AUDIO-09'
,'VB24AUDIO-10'
,'VB24AUDIO-11'
,'VB24AUDIO-12'
,'VB24AUDIO-13'
,'VB24AUDIO-14'
,'VB24AUDIO-15'
,'VB24AUDIO-16'
,'VB24AUDIO-17'
,'VB24AUDIO-18'
,'VB24AUDIO-19'
,'VB24AUDIO-20'
,'VB24AUDIO-21'
,'VB24AUDIO-22'
,'VB24AUDIO-23'
,'VB24AUDIO-24'
,'VB24AUDIO-25'
,'VB24AUDIO-26'
,'VB24AUDIO-27'
,'VB24AUDIO-28'
,'VB24AUDIO-29'
,'VB24AUDIO-30'
];