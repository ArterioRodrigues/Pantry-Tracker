import Firebase from "./firebase.js";
const firebase = new Firebase()

function onInit() {
    document.getElementById('newItemBtn').addEventListener('click', () => {
        addItemToList();
    });
    
    firebase.getDataBase().then(e => {
        e.forEach(element => {
            if (element && element.data) { // Ensure item and item.data are defined
                addRow(element);
            } else {
                console.error("Element or element.data is undefined", element);
            }
        });
    });
}

function addRow(item) {
    console.log(item);
    const table = document.getElementById("tbl");
    const tr = document.createElement('tr');
    tr.id = item.id;

    let th = document.createElement('th');
    th.textContent = item.data.name;
    tr.appendChild(th);
    
    th = document.createElement('th');
    th.textContent = item.data.count;
    tr.appendChild(th);

    for(let val of ["add", "sub"]){
        const btn = document.createElement('button');
        btn.textContent = val;
        btn.className = val;

        btn.addEventListener('click', function(){ 
            handleItem(tr, val);
        });

        tr.appendChild(btn);
    }

    table.appendChild(tr);
}

function handleItem(tag, action) {    
    let count = parseInt(tag.children[1].textContent);
    if (action === "add")
        count += 1;
    else if (action === "sub" && count > 0)
        count -= 1;
    else
        firebase.deleteItem(tag.id);
    
    tag.children[1].textContent = count;

    let data = {
        count: count,
        name: tag.children[0].textContent, 
    };

    firebase.setItem(tag.id, data).then(() => {
        console.log("Item successfully updated in Firebase.");
    }).catch(error => {
        console.error("Error updating item in Firebase:", error);
    });
}

function addItemToList(){
    let name = document.getElementById("name").value;
    let count = document.getElementById("count").value;
    const id  = Date.now().toString(16);

    const item = {
        id : id,
        data :{
            name: name,
            count: count,
        }
    }
    firebase.setItem(item.id, item.data);
    addRow(item);

}

onInit();