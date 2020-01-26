const socket = io.connect("http://localhost:8000");

//QUERY DOM -- CAN ALSO BE ACHIEVED WITH jQuery
let message = document.getElementById("message");
let handle = document.getElementById("handle");
let output = document.getElementById("output");
let feedback = document.getElementById("feedback");
const btn = document.getElementById("send");

//EMITTING THE MSSAGE TO THE SERVER
btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
})

//LISTENING FOR MESSAGES FROM SERVER
socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `
  <p>
    <strong> ${data.handle}: </strong>
    <strong> ${data.message} </strong>
  </p>`
})

socket.on("typing", (data) => {
  feedback.innerHTML = `
    <p>
      <em> ${data} is typing a message... </em>
    </p>
  `
})