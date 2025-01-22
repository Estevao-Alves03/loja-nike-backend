function resp<T>(status: number, message: T) {
    return { status, message };
  }
  
  export default resp;
  