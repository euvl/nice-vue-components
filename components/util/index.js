export default {
  stopEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
