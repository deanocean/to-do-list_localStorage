// 指定 dom
let list = document.querySelector('.list');
let text = document.querySelector('.text');
let send = document.querySelector('.send');
let data = JSON.parse(localStorage.getItem('listData')) || [];

// 監聽與更新
send.addEventListener('click', addData);
text.addEventListener('keyup', addDataEnter);
list.addEventListener('click', toggleDone);
updateList(data);

// 加入列表，並同步更新網頁與 localstorage
function addData(e) {
    e.preventDefault();
    let txt = document.querySelector('.text').value;
    if(txt == "") { return; }
    let todo = {
        content: txt
    };
    data.push(todo);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
}

// 更新網頁內容
function updateList(data) {
    let str = '';
    data.forEach(function(item, index){
        str += `
            <li>
                <span>${ item.content }</span>
                <a href="#" data-index="${ index }">Delete</a>
            </li>
        `
    })
    list.innerHTML = str;
    text.value = "";
}

// 刪除代辦事項
function toggleDone(e) {
    e.preventDefault();
    if(e.target.nodeName != "A"){ return; }
    let index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
}

// Enter key
function addDataEnter(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        addData(e);
    }
} 