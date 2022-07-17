const editBtn = document.getElementById("edit");
const form = document.getElementById("form");
const updateBtn = document.getElementById("add");

const trs = document.querySelectorAll("tbody tr");
[...trs].forEach(tr => {
  tr.addEventListener("click", function (e) {
    form.action = `/updatetask/${tr.id}`;
    updateBtn.innerHTML = `Update`;
    if (tr.id === e.target.dataset.id) {
      [...tr.children].forEach(td => {
        if (td.className === "taskname") {
          form[0].value = td.textContent;
        }
        if (td.className === "priority") {
          form[1].selectedIndex =
            td.textContent === "high"
              ? 1
              : td.textContent === "medium"
              ? 2
              : td.textContent === "low"
              ? 3
              : 0;
        }
        if (td.className === "date") {
          form[2].value = new Date(td.textContent).toISOString().slice(0, 10);
        }
      });
    }
  });
});
