window.onload = function () {
  const svg = document.querySelector(".worldMap");
  const container = document.querySelector(".container");
  const group = document.getElementById("group");
  console.log(container);
  container.addEventListener("wheel", scaleMap);

  function scaleMap(event) {
    event.preventDefault();
    const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1; // Adjust the scale factor as needed
    const matrix = new DOMMatrix(group.style.transform);
    let scaleBy = matrix.a * scaleFactor;
    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;
    group.style.transformOrigin = `${mouseX}px ${mouseY}px`;
    group.style.transform = `scale(${scaleBy})`;
  }

  // Variables to store the initial position and mouse offset
  let initialX = 0;
  let initialY = 0;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  // Function to handle mouse down event
  const startDrag = (event) => {
    // Store the initial position and calculate the mouse offset
    initialX = svg.getAttribute("cx");
    initialY = svg.getAttribute("cy");
    offsetX = event.clientX - initialX;
    offsetY = event.clientY - initialY;
    isDragging = true;
  };

  // Function to handle mouse move event
  const drag = (event) => {
    if (isDragging) {
      // Update the position of the SVG element
      const newX = event.clientX - offsetX;
      const newY = event.clientY - offsetY;
      svg.setAttribute("transform", `translate(${newX}, ${newY})`);
    }
  };

  // Function to handle mouse up event
  const endDrag = () => {
    isDragging = false;
  };

  // Attach event listeners to the SVG element
  svg.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);
};
