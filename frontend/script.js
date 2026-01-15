fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(data => {
    const ul = document.getElementById("users");
    data.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} - ${user.email}`;
      ul.appendChild(li);
    });
  });
