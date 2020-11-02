const doThis = document.getElementById('regForm');

doThis.addEventListener('submit', async (even) => {
  even.preventDefault();
  console.log(even.target.userName.value);

  const response = await fetch('/psyhologregistration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: even.target.userName.value,
      userPassword: even.target.userPassword.value,
      userEmail: even.target.userEmail.value,
    }),
  });
  const resp = await response.json();
  console.log(resp);
  if (resp.status == 'error') {
    window.location.assign('/errors');
  }
  if (resp.status == 200) {
    window.location.assign('/game');
  }
})
