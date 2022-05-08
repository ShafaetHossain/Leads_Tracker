// myLeads -> should be assigned to an empty array
// inputEl -> should be assigned to the text input file

let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const deleteBtn = document.querySelector("#delete-btn");
const saveBtn = document.querySelector("#tab-btn");
const ulEl = document.querySelector("#ul-el");

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
});

saveBtn.addEventListener("click", function(){
    // Grab the URL of the current tab:
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
     }); 
})

deleteBtn.addEventListener("dblclick", function(){
    myLeads = [];
    localStorage.clear();
    render(myLeads);
})

function render(leads){
    let listItems = "";
    for(let i = 0; i < leads.length; i++){
        //listItems += "<li><a target='_blank' href=' " + leads[i] + " '>" + leads[i] + "</a></li>";  // We can do the same things in different way

        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `

        // DOM(here we use .innerHTML) manipulation has a cost so we use it one times after the loop

        // From here
    /*
        const li = document.createElement("li");
        li.textContent = myLeads[i];
        ulEl.append(li);
    */
        // To here

    }

    ulEl.innerHTML = listItems;

}

// const container = document.querySelector("#container");
// container.innerHTML = "<button onclick='buy()'>Buy!</button>";

function buy(){
    container.innerHTML += "<p>Thank you for buying!</p>";

}