export function successMessage(msg: string) {
  window.$message?.success(msg);
}

export function errorMessage(msg: string) {
  window.$message?.error(msg);
}
