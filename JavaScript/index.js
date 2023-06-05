window.onload = function () {
  const svg = document.querySelector(".worldMap");
  const container = document.querySelector(".container");
  const group = document.getElementById("group");

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
    adjustSvgContainerSize();
  }

  // Variables to store the initial position and mouse offset
  let initialX = 0;
  let initialY = 0;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let newX = 0;
  let newY = 0;
  let stack = new Array();

  // Function to handle mouse down event
  const startDrag = (event) => {
    // Store the initial position and calculate the mouse offset
    offsetX = event.clientX;
    offsetY = event.clientY;
    if (stack.length != 0) {
      const arr = stack.pop();
      initialX = arr[0];
      initialY = arr[1];
    }
    isDragging = true;
    adjustSvgContainerSize();
  };

  //change scroll bar instead of moving the image

  // Function to handle mouse move event
  const drag = (event) => {
    if (isDragging) {
      // Update the position of the SVG element
      newX = event.clientX - offsetX;
      newY = event.clientY - offsetY;
      svg.setAttribute(
        "transform",
        `translate(${initialX + newX}, ${initialY + newY})`
      );
      adjustSvgContainerSize();
    }
  };

  // Function to handle mouse up event
  const endDrag = (event) => {
    stack.push([initialX + newX, initialY + newY]);
    isDragging = false;
  };

  const adjustSvgContainerSize = () => {
    const bbox = group.getBBox();
    container.style.width = bbox.width + "px";
    container.style.height = bbox.height + "px";
  };

  // Attach event listeners to the SVG element
  svg.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);
};
