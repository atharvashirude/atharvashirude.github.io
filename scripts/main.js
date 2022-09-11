
const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));


    
app.addEventListener("keypress", async function(event){
  if(event.key === "Enter"){
    await delay(150);
   getInputValue();
   
    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("click", function(event){
  const input = document.querySelector("input");
  input.focus();
})


async function open_terminal(){
  createText("Welcome");
  await delay(700);
  createText("Starting the server...");
  await delay(1500);
  createText("Type help to see what all you can do:");
 
  // createCode("whoami", "Who am i and what do i do.");
  createCode("help", "See all commands.");
  // createCode("social -a", "All my social networks.");
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path")
  p.textContent = "# user";
  span1.textContent = " in";
  span2.textContent = " ~/atharvashirude";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);
  await delay(500);
  new_line();
}


function new_line(){
  
  // const p = document.createElement("p");
  // const span1 = document.createElement("span");
  // const span2 = document.createElement("span");
  // p.setAttribute("class", "path")
  // p.textContent = "# user";
  // span1.textContent = " in";
  // span2.textContent = " ~/atharvashirude";
  // p.appendChild(span1);
  // p.appendChild(span2);
  // app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
  
}

function removeInput(){
  const div = document.querySelector(".type");
  app.removeChild(div);
}

async function getInputValue(){
  
  const value = document.querySelector("input").value;
  if(value === "help"){
    trueValue(value);
    
    createCode("ls", "List all files. ");
    createCode("whoami", "Who am i and what do i do.");
    createCode("cat", "Displays the content of text files.");
    createCode("social -a", "All my social networks. Follow me there ;)");
    createCode("pwd", "Present working directory.");
    createCode("clear", "Clean the terminal.");
    
  }
  else if(value === "ls"){
    trueValue(value);
    createText("<a href='https://drive.google.com/file/d/1tPM2t4V6NgMRLPXeRXEaz6HFwI65ICVC/view?usp=sharing' target='_blank'><i class='fa fa-file'></i> resume.pdf      </a><a target='_blank'><i class='fa fa-file'></i> work_exp.txt </a></a><a target='_blank'><i class='fa fa-file'></i> edu.txt</a>")
  }
  else if(value === "whoami"){
    trueValue(value);
    createText("Atharva Shirude")
    createText("I enjoy securing applications and infrastructure to make products and environments more robust and secure. Looking forward to work in an organization where I can input my creative methodologies and out of the box thinking and be a team player.")
  }
  else if(value === "social -a"){
    trueValue(value);
    createText("<a href='mailto:sec.atharvashirude@gmail.com' target='_blank'><i class='fa fa-envelope'></i> sec.atharvashirude@gmail.com</a>")
    createText("<a href='https://www.linkedin.com/in/atharvashirude/' target='_blank'><i class='fab fa-linkedin-in white'></i> linkedin.com/in/atharvashirude</a>")
    createText("<a href='https://rootissh.in' target='_blank'><i class='fa fa-globe'></i> rootissh.in</a>")    
    createText("<a href='https://github.com/atharvashirude' target='_blank'><i class='fab fa-github white'></i> github.com/atharvashirude</a>")
  }
  else if(value === "cat work_exp.txt"){
    trueValue(value);
    createText("Information Security Engineer, Algosmic  <br>  (02/2022 – present) | Pune, India<br><br>" +
    "* Web Application & API, Internal & External Network, Mobile Application, Wi-Fi, Cloud Security Penetration Testing"+
    "<br>* Red Team Operations"+
    "<br>* Script development (Python and Shell scripts)"+
    "<br>* Incident Handling & Incident Response"+
    "<br>* Log Monitoring & Security Analysis"+
    "<br>* Reporting & Documentation"+
    "<br>* Knowledge & Content Creation (Penetration testing)<br>"+
    "Associate Security Consultant, HACK-X Security"+
    "<br>(07/2021 – 11/2021) | Pune, India<br><br>"+
    "<br>* Performing Regular Pentest over a Variety of Technology Stack."+
    "<br>* Web Application & API Penetration Testing"+
    "<br>* Network Attack Simulation"+
    "<br>* Conducting 10+ VAPT training sessions"+
    "<br>* Reporting, Documentation & Reviewing<br><br>"+
    "Intern, Cybercell, Pimpri Chinchwad Police Commissionerate Office"+
    "<br>(03/2021 – 06/2021)<br>"+
    "<br>* A project which provided an interface for data entry to store case files"+
    "<br>* It was developed to store for more than 100000 cases into a database and secure the application"+
    "<br><br>Cyber Security Research Intern, Pianalytix"+
    "<br>(11/2020 – 12/2020)<br>"+
    "<br>* Researched on 10 different topics in a span of 1 month<br><br>"+
    "Summer Intern, Leading India, Bennett University"+
    "<br>(05/2020 – 06/2020)<br>"+
    "<br>* My team's project was ranked 1st among 26+ teams"
    )
  }
  else if(value === "cat edu.txt"){
    trueValue(value);
    createText("B.Tech Computer Science and Engineering,<br>"+
    "MIT WPU, Pune"+
    " | 2019 – 2022"+
    "<br>8.5 CGPA"+
    "<br><br>Diploma in Computer Science,<br>"+
    "MIT Polytechnic, Pune"+
    " | 2017 – 2019"
    )
  }
  else if(value === "pwd"){
    trueValue(value);
    createText("/home/atharvashirude")
  }
  else if(value === "social"){
    trueValue(value);
    createText("Didn't you mean: social -a?")
  }
  else if(value === "cat"){
    trueValue(value);
    createText("Syntax: cat filname.txt")
  }
  else if(value === "cat resume.pdf"){
    trueValue(value);
    createText("Cannot display a pdf. Just 'ls' and click on the file.")
  }
  
  else if(value === "clear"){
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
  }
  else{
    falseValue(value);
    createText(`command not found: ${value}`)
  }
}

function trueValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname){
  const p = document.createElement("p");
  
  p.innerHTML =
  text
  ;
  app.appendChild(p);
}

function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML =
 `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}









// Steve Jobs Quotes
console.log("\n \t Your work is going to fill a large part of your life,\n and the only way to be " +
  "truly satisfied is to do what you \n believe is great work. And the only way to do great" +
  " work \n is to love what you do. If you haven't found it yet, keep \n looking. Don't settle." +
  " As with all matters of the heart, \n you'll know when you find it.\n\n\n \t\t\t\t\t\t\t\t\t\t\t " +
  "Steve Jobs \n\n");


open_terminal();
