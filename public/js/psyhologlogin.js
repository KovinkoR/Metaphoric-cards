const LoginForm = document.getElementById('LoginForm');

LoginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  // console.log(event.target);
  const psyhologEmail = document.getElementById('psyhologEmail');
  const psyhologPassword = document.getElementById('psyhologPassword');
  const resp = await fetch('/psyhologlogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userEmail: psyhologEmail.value,
      userPassword: psyhologPassword.value,
    }),
  });
  const respose = await resp.json();
  console.log(respose);
  if (respose.loginSuccess) {
    window.location.assign('/game');
  } else {
    window.location.assign('/errors');
  }
});
