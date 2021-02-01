export default {
  byteLen(s) {
    return (s || '').replace(/[^\x00-\xff]/g, "--").length;
  }
}