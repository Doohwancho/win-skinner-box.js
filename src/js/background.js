
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 
    features: {
        time: {
          hourUnit: '00:00:00'
        }
    }
  });
});