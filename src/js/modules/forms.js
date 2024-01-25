import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
   const form = document.querySelectorAll('form'),
      inputs = document.querySelectorAll('input'),
      windows = document.querySelectorAll('[data-modal]'),
      windowCalcBtn = document.querySelector('.popup_calc_button'),
      windowCalcBtnProfile = document.querySelector('.popup_calc_profile_button');

   checkNumInputs('input[name="user_phone"]');

   const message = {
      loading: 'Загрузка ...',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так ...'
   };

   const postData = async (url, data) => {
      document.querySelector('.status').textContent = message.loading;
      let result = await fetch(url, {
         method: 'POST',
         body: data
      });

      return await result.text();
   };

   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = '';
      });
   };


   form.forEach(item => {


      item.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         item.appendChild(statusMessage);

         const formData = new FormData(item);
         if (item.getAttribute('data-calc') === 'end') {
            for (let key in state) {
               formData.append(key, state[key]);
            }
         }

         postData('assets/server.php', formData)
            .then(result => {
               console.log(result);
               statusMessage.textContent = message.success;
            })
            .catch(() => {
               statusMessage.textContent = message.failure;
            })
            .finally(() => {
               clearInputs();
               setTimeout(() => {
                  statusMessage.remove();
                  windows.forEach(item => {
                     item.style.display = 'none';
                  })
                  document.body.style.overflow = '';
               }, 3000);
               state.form = 0;
               state.width = 0;
               state.height = 0;
               state.type = 'tree';
               state.profile = '';

               windowCalcBtn.disabled = true;
               windowCalcBtnProfile.disabled = true;
               console.log(state);
               
            });
      });
   });
};

export default forms;