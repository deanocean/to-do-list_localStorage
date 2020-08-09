// 指定 dom
let list = document.querySelector('.list');
let send = document.querySelector('.send');
let data = JSON.parse(localStorage.getItem('listData')) || [];

// 監聽與更新
send.addEventListener('click', addData);
list.addEventListener('click', toggleDone);
updateList(data);

// 加入列表，並同步更新網頁與 localstorage
function addData(e) {
    e.preventDefault();
    let txt = document.querySelector('.text').value;
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
                <a href="#" data-index="${ index }">Delete</a><span>${ item.content }</span>
            </li>
        `
    })
    list.innerHTML = str;
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