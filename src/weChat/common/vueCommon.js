function routerReplace(vue, path, isRecord = false) {
  if (isRecord) {
    vue.$router.push({ path: path });
  } else {
    vue.$router.replace({ path: path });
  }
}
export { routerReplace };
