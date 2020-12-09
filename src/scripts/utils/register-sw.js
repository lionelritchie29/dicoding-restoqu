const registerSw = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
      console.log('Register SW Success');
    } catch {
      console.log('Register SW Error');
    }
  }
};

export default registerSw;
