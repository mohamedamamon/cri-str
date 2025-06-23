let data = JSON.parse(localStorage.getItem('cristalStarData')) || {
  players: {},
  posts: [],
  storeItems: [],
  messages: []
};

let currentUser = null;

function saveData() {
  localStorage.setItem('cristalStarData', JSON.stringify(data));
}

function checkPassword() {
  const code = document.getElementById('userCode').value.trim();
  const password = document.getElementById('userPassword').value;

  if(code === 'dfg' && password === 'adminpass') {
    currentUser = 'admin';
    showAdminPanel();
    return;
  }
 if(data.players[code] && data.players[code].password === password) {
    currentUser = code;
    showPlayerPanel();
    return;
  }

  document.getElementById('errorMsg').style.display = 'block';
}

function logout() {
  currentUser = null;
  document.getElementById('loginBox').style.display = 'block';
  document.getElementById('app').classList.add('hidden');
  document.getElementById('errorMsg').style.display = 'none';
  clearInputs();
}

function clearInputs() {
  document.getElementById('userCode').value = '';
  document.getElementById('userPassword').value = '';
}

function showAdminPanel() {
  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('app').classList.remove('hidden');
document.getElementById('username').innerText = 'المشرف';
  document.getElementById('adminPanel').classList.remove('hidden');
  document.getElementById('playerPanel').classList.add('hidden');
  document.getElementById('errorMsg').style.display = 'none';

  renderPlayersAdmin();
  renderPostsAdmin();
  renderStoreAdmin();
}

function showPlayerPanel() {
  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('username').innerText = data.players[currentUser].name;
  document.getElementById('playerPanel').classList.remove('hidden');
  document.getElementById('adminPanel').classList.add('hidden');
  document.getElementById('errorMsg').style.display = 'none';

  renderPlayerUser();
  renderStoreUser();
  renderMessages();
  renderPostsUser();
}
// إضافة لاعب جديد
function addPlayer() {
  const name = document.getElementById('newPlayerName').value.trim();
  const code = document.getElementById('newPlayerCode').value.trim();
  const password = document.getElementById('newPlayerPassword').value;

  if(!name || !code || !password) {
    alert('يرجى ملء جميع الحقول.');
    return;
  }
  if(data.players[code]) {
    alert('الكود مستخدم مسبقاً.');
    return;
  }

  data.players[code] = { name, password, score: 0 };
  saveData();
  alert('تم إضافة اللاعب.');
  clearAddPlayerInputs();
  renderPlayersAdmin();
}
function clearAddPlayerInputs() {
  document.getElementById('newPlayerName').value = '';
  document.getElementById('newPlayerCode').value = '';
  document.getElementById('newPlayerPassword').value = '';
}

// إضافة عنصر جديد
function addField() {
  const field = document.getElementById('newFieldName').value.trim();
  if(!field) {
    alert('أدخل
