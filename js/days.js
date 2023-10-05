var ano, mes, dataMes;
var plantaoMes, plantaoMesAnt;
var equipeData, equipeSelect;
var next = document.querySelector('li.next');
var prev = document.querySelector('li.prev');
const maxDias = 37;

Date.prototype.initialDay = function(){
  const buffDate = new Date();
  buffDate.setTime(this.getTime());
  buffDate.setDate(1);
  return buffDate.getDay();
};

Date.prototype.spamDays = function(){
  var spam = parseInt(this.initialDay());
  if (spam == 0) {
    spam=6;
    return spam;
  }
  else {
    spam--;
  }
  return spam;
};

Date.prototype.getDia = function(){
  const dias = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
  return dias[this.initialDay()];
};

Date.prototype.mes = function(){
  const mes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']; 
  return mes[this.getMonth()];
};

Date.prototype.mesAnt = function(){
  const mes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']; 
  var indice = this.getMonth();
  if (indice == 0) indice = 11  
  else indice --;
  return mes[indice];
};

Date.prototype.numDias = function(){
  var numAno = this.getFullYear(),
      numMes = this.getMonth()+1,
      numDias = new Date(numAno, numMes, 0).getDate();              
      return parseInt(numDias);       
};

Date.prototype.numDiasMesAnt = function(){
  const buffDate = new Date();
  buffDate.setTime(this.getTime());
  buffDate.setMonth(buffDate.getMonth()-1);
  return buffDate.numDias();
}



window.onload = function(){
  iniciaVars();
  calculaPlantao();
  imprimeCalendario();
  showEquipe();
};

function iniciaVars(){
  dataMes = new Date(); 
  hoje = new Date();
  dataMes.setDate(15);
  dataMes.setHours(07,0,0,0);  
  equipeData = {equipe: "Equipe A" , plantaoDia: new Date(2023,04,05,07)};  
 }

function imprimeCalendario(){
  var divWeeks, ul, div, dia, monthLi, contador;
  var indice, classBtn;
  
  monthLi = document.querySelector('li.month');
  monthLi.innerHTML = `${dataMes.mes()}<br>
  <span style="font-size:18px">${dataMes.getFullYear()}</span>`;  
  
  divWeeks = document.querySelector('div.weeks');
  divWeeks.innerHTML = "";
  ul = document.createElement('ul');
  ul.classList = "week";
  classBtn="btn-date";
  contador=1;
  // caso não haja elementos de data na página, os cria
    for(i=1-dataMes.spamDays();i <= dataMes.numDias();i++){       
      div = document.createElement('div');
      if (i < 1) {
        dia = dataMes.numDiasMesAnt() + i;
      }
      else {
        dia = i;
      }
      if ((dia == hoje.getDate()) && (dataMes.getMonth() == hoje.getMonth())) {
        classBtn="btn-date atual";
      }
      else {
        classBtn="btn-date";
      }
      diaStr = dia.toString();

      if ((i > 0)&&(i < 10)) dia = '0'+diaStr;      
      if(i > 0) {
        indice = i -1;
        div.innerHTML = `<div class='dbtn'><button class='${classBtn}'
        >${diaStr}</button></div><div class='textEq eq${plantaoMes[i-1].dia}'>${plantaoMes[i-1].dia}</div><div class='textEq eq${plantaoMes[i-1].noite}'>${plantaoMes[i-1].noite}</div>`;
      }
      else {
        indice = dataMes.numDiasMesAnt() + i -1;
        div.innerHTML = `<div class='dbtn'><button class='${classBtn}'>${diaStr}</button></div><div class='textEq eq${plantaoMesAnt[indice].dia}' >${plantaoMesAnt[indice].dia}</div><div class='textEq eq${plantaoMesAnt[indice].noite}'>${plantaoMesAnt[indice].noite}</div>`;
        div.style.backgroundColor = "#bbb";
        
      }
      // li.innerHTML = `<button class='btn-date'>${dia}</button><br><textarea class='textEq' cols='10' rows='3' disabled>${plantaoMes[i-1].dia}\n\n${plantaoMes[i-1].noite} </textarea>`;
      div.classList = 'dia';
      ul.appendChild(div);    
            
      if((contador % 7) == 0) {
        console.log('child nodes: ' +ul.childNodes.length);
        divWeeks.appendChild(ul);
        ul = document.createElement('ul');
        ul.classList = "week";
      }
      contador++;      
      // if (i != dataMes.numDias()) dataMes.setDate(dataMes.getDate()+1);        
    }
    divWeeks.appendChild(ul);
    
    if((ul.childNodes.length > 0) && (ul.childNodes.length < 7)) {
      while(ul.childNodes.length < 7) {
        div = document.createElement('div');
        div.classList = 'dia vazio';
        ul.appendChild(div);
      }
      console.log('child nodes: ' +ul.childNodes.length);
      divWeeks.appendChild(ul);
  }
      // console.log(plantaoMes);
  // console.log('\n\n********');
  // console.log(plantaoMesAnt);     
  div = document.querySelectorAll('div');
  console.log(`Elementos div ${div.length}`);   
  console.log("Primeiro dia do mês: "+dataMes.getDia()+ " "+dataMes.initialDay());
  console.log(`Spam days: ${dataMes.spamDays()}`);
  
}

  function calculaPlantao(){    
    var equipes = [{dia:"A",noite:"E"},{dia:"B",noite:"A"},{dia:"C",noite:"B"},{dia:"D",noite:"C"},{dia:"E",noite:"D"}];
    var dia, dias, cont,contDias, contMes;
    //inicia objetos PlantaoMes e PlantaoMesAnt
    plantaoMes = [{dia:"",noite:""}];
    plantaoMesAnt = [{dia:"-",noite:"-"}];
    contMes = 1;
    dataMes.setMonth(dataMes.getMonth()-1);

    while (contMes <= 2) {
      console.log('galao da massa');
      dias = dataMes.numDias();
      for(i=0;i < dias-1;i++){ 
        var plantao = {dia:"D",noite:"D"};
        if (contMes == 1) {
          plantaoMesAnt.push(plantao);
        }
        else if (contMes == 2) {
          plantaoMes.push(plantao);
        }
      }
      // Posiciona o objeto equipeData.plantaoDia no mês a ser considerado
      if(equipeData.plantaoDia < dataMes){
        while (equipeData.plantaoDia < dataMes) {
          equipeData.plantaoDia.setDate(equipeData.plantaoDia.getDate()+5);
        }    
      }
      else if(equipeData.plantaoDia > dataMes) {
        while (equipeData.plantaoDia > dataMes) {
          equipeData.plantaoDia.setDate(equipeData.plantaoDia.getDate()-5);
        } 
      }  

      dia = equipeData.plantaoDia.getDate();
      contDias = parseInt(dia);
      contDias--;        
      cont=0;
      console.log(contDias);       
      
      while(contDias <= dias-1){
        if (contMes == 1) {
          plantaoMesAnt[contDias].noite = equipes[cont].noite;
          plantaoMesAnt[contDias].dia = equipes[cont].dia;
        }
        else if (contMes == 2) {
          plantaoMes[contDias].dia = equipes[cont].dia;
          plantaoMes[contDias].noite = equipes[cont].noite;
        }
        contDias++;
        cont++;
        if (cont > equipes.length -1) cont = 0;
      }
      
      contDias = parseInt(dia);
      contDias--;   
      cont=0;
      while(contDias >= 0){
        if (contMes == 1) {
          plantaoMesAnt[contDias].noite = equipes[cont].noite;
          plantaoMesAnt[contDias].dia = equipes[cont].dia;
        }
        else if (contMes == 2) {
          plantaoMes[contDias].dia = equipes[cont].dia;
          plantaoMes[contDias].noite = equipes[cont].noite;
        }
        contDias--;
        cont--;
        if (cont < 0) cont = equipes.length -1;
      }

      if (contMes == 1) {
        dataMes.setMonth(dataMes.getMonth()+1);
      }      
      contMes++;
    }  7
    console.log(`Mes atual: ${dataMes.mes()} - Dias: ${dataMes.numDias()}`);
    console.log(`Mes anterior: ${dataMes.mesAnt()} - Dias: ${dataMes.numDiasMesAnt()}`);
    console.log(`Spam de dias: ${dataMes.spamDays()}`);
  }  

  function showEquipe(){
    var equipesDiv = document.querySelectorAll('div.textEq');
    for(i=0;i < equipesDiv.length;i++) {
      equipesDiv[i].addEventListener('click',function(){
        console.log('Equipe legal '+this.innerText);
        var equipeLetra = this.innerText;
        showEq(equipeLetra);
      });
    }
  }

  function showEq(equipeLetra) {
    var equipesInfo = [
                 {equipe:'A', 
                 delegado:{nome:'Alexandre Kennedy Ladeia Barbosa',masp:'387.321-3',email:'',telefone:''}, 
                 coordenador:{nome:'Adriana Rocha Silva',masp:'458.268-0',email:'',telefone:''},
                 supervisor:{nome:'José Cecílio Neto e Lopes',masp:'1.111.869-2',email:'',telefone:''},
                 investigadores:[
                  {nome:'Alex Vasconcelos Ferreira de Brito',masp:'1.111.637-3',email:'',telefone:''},  
                  {nome:'Daniel da Costa Borges',masp:'1.112.912-9',email:'',telefone:''},  
                  {nome:'Eduardo Terra Babeto',masp:'1.174.295-4',email:'',telefone:''},  
                  {nome:'Gilberto Tome Borges',masp:'667.871-8',email:'',telefone:''} 
                 ]},
                 {equipe:'B', 
                 delegado:{nome:'João César Bicalho Costa Assis',masp:'1.330.574-3',email:'',telefone:''}, 
                 coordenador:{nome:'Ricardo Antônio Bicalho Ribeiro',masp:'950.577-7',email:'',telefone:''},
                 supervisor:{nome:'Marcos Vinícius Couto Santos',masp:'903.948-8',email:'',telefone:''},
                 investigadores:[
                  {nome:'Leonardo Apolinário Dutra Oliveira',masp:'1.174.262-4',email:'',telefone:''},  
                  {nome:'Fernando Oliveira Carneiro',masp:'1.242.129-3',email:'',telefone:''},  
                  {nome:'Paulo Gomes',masp:'1.242.845-4',email:'',telefone:''},  
                  {nome:'Sueli Eustáquia de Carvalho Simões',masp:'904.443-9',email:'',telefone:''}  
                 ]},
                 {equipe:'C', 
                 delegado:{nome:'Fernanda Aparecida Resende',masp:'667.967-4',email:'',telefone:''}, 
                 coordenador:{nome:'Nara Ivo Celestino',masp:'667.965-8',email:'',telefone:''},
                 supervisor:{nome:'Simeão Vieira Lopes',masp:'668.175-3',email:'',telefone:''},
                 investigadores:[
                  {nome:'Cláudia Piedade Guimarães',masp:'546.876-4',email:'',telefone:''},  
                  {nome:'Sílvio Américo Bicalho Piacenza',masp:'1.112.022-7',email:'',telefone:''},  
                  {nome:'Priscila Corsino de Paula',masp:'1.255.912-6',email:'',telefone:''},  
                  {nome:'Edwilson de Souza Oliveira',masp:'1.257.077-6',email:'',telefone:''}  
                 ]},
                 {equipe:'D', 
                 delegado:{nome:'José Luiz Arantes Campolina',masp:'572.137-8',email:'',telefone:''}, 
                 coordenador:{nome:'João Flávio Rabelo Alves',masp:'547.440-8',email:'',telefone:''},
                 supervisor:{nome:'Jurandir Loiola dos Reis',masp:'370.202-4',email:'',telefone:''},
                 investigadores:[
                  {nome:'Paulo Roberto Alves',masp:'388.222-2',email:'',telefone:''},  
                  {nome:'Welinton Vieira Rocha',masp:'667.873-4',email:'',telefone:''},  
                  {nome:'Patrícia Tadeu de Oliveira',masp:'1.112.254-6',email:'',telefone:''},  
                  {nome:'Carlos Eduardo Vasconcelos Gomes',masp:'1.113.642-1',email:'',telefone:''}  
                 ]},
                 {equipe:'E', 
                 delegado:{nome:'Gilson Rodrigues Rosa',masp:'458.380-3',email:'',telefone:''}, 
                 coordenador:{nome:'Wenri Dorneli Gonçalves',masp:'458.205-2',email:'',telefone:''},
                 supervisor:{nome:'Lazaro Alexandre de Oliveira',masp:'667.975-7',email:'',telefone:''},
                 investigadores:[
                  {nome:'Adriane Holfman da Silva Villeneuve',masp:'1.111.459-2',email:'',telefone:''},  
                  {nome:'Jonas Aquino Gomes',masp:'903.917-3',email:'',telefone:''},  
                  {nome:'Mário Lúcio Rodrigues da Silva',masp:'904.549-3',email:'',telefone:''}  
                 ]}];                
                 
    switch (equipeLetra) {
      case 'A':
        equipeSelect = equipesInfo[0];
        break;
      case 'B':
        equipeSelect = equipesInfo[1];
        break;
      case 'C':
        equipeSelect = equipesInfo[2];
        break;
      case 'D':
        equipeSelect = equipesInfo[3];
        break;
      case 'E':
        equipeSelect = equipesInfo[4];
        break;
    }
    alert(JSON.stringify(equipeSelect));
  }

  prev.addEventListener('click',function(){
    dataMes.setMonth(dataMes.getMonth()-1);
    calculaPlantao();
    imprimeCalendario();
    console.log(dataMes);
  });

  next.addEventListener('click',function(){
    dataMes.setMonth(dataMes.getMonth()+1);
    calculaPlantao();
    imprimeCalendario();
    console.log(dataMes);
    
  });



/*
<li class="month">
        Julho<br>
        <span style="font-size:18px">2021</span>
      </li>

var equipes = [
        {equipe: "Equipe A" , plantaoDia: new Date(2021,05,20,07)},
        {equipe:"Equipe B", plantaoDia: new Date(2021,05,21,07)},
        {equipe:"Equipe C", plantaoDia: new Date(2021,05,22,07)},
        {equipe:"Equipe D", plantaoDia: new Date(2021,05,23,07)},
        {equipe:"Equipe E", plantaoDia: new Date(2021,05,24,07)}]; 
        ano = {
      ano:2021,
      mes:[{dia:[{equipeDia:'E',equipeNoite:'A'},{equipeDia:'B',equipeNoite:'C'}]}]
    };
        */
        //inicia array

        // console.log(`Mês: Janeiro - Dia 1: Equipe Manhã: ${ano.mes[0].dia[0].equipeDia}- Equipe Noite: ${ano.mes[0].dia[0].equipeNoite}`);
    // console.log(`Mês: Janeiro - Dia 2: Equipe Manhã: ${ano.mes[0].dia[1].equipeDia}- Equipe Noite: ${ano.mes[0].dia[1].equipeNoite}`);


    