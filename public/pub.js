function deleteTodo(id) {
    fetch('/deleteTodo/' + (id), {method: 'POST'})
    .then(window.location.reload(true))
};

const checks = document.getElementsByName('doneSwitch');

for (let i = 0; i < checks.length; i++) {
    checks[i].addEventListener('click', function onClick() {

        if(checks[i].checked) {
            var el = document.getElementById(checks[i].id);
            el.classList.add("todoDone");
        } else {
            var el = document.getElementById(checks[i].id);
            el.classList.remove("todoDone");
        }

        (async () => {
            const rawResponse = await fetch('/editTodo/' + checks[i].id, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({done: checks[i].checked})
            });
          })
          ()
      });
};
