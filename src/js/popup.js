let hourUnitDOM = document.getElementById('hour-unit');

hourUnitDOM.addEventListener("change", function(e){
  chrome.storage.sync.set({
      features: {
          time: {
              hourUnit: e.target.value,
          }
      },
  });
});


function updatePopup() {
  chrome.storage.sync.get({
      features: {
          time: {
              hourUnit: '00:00:00'
          }
        }
    }, function(option){
      hourUnitDOM.value = option.features.time.hourUnit;
  });
}

document.addEventListener('DOMContentLoaded', updatePopup, false);