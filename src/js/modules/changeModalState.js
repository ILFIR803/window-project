import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
   const windowForm = document.querySelectorAll('.balcon_icons_img'),
      windowWidth = document.querySelectorAll('#width'),
      windowHeight = document.querySelectorAll('#height'),
      windowType = document.querySelectorAll('#view_type'),
      windowProfile = document.querySelectorAll('.checkbox'),
      windowCalcBtn = document.querySelector('.popup_calc_button'),
      windowCalcBtnProfile = document.querySelector('.popup_calc_profile_button');

   windowCalcBtn.disabled = true;
   windowCalcBtnProfile.disabled = true;
   checkNumInputs('#width');
   checkNumInputs('#height');

   function bindActionToElems(event, elem, prop) {
      elem.forEach((item, i) => {
         item.addEventListener(event, () => {

            switch (item.nodeName) {
               case 'SPAN':
                  state[prop] = i;
                  break;
               case 'INPUT':
                  if (item.getAttribute('type') === 'checkbox') {
                     i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Тёплое';
                     elem.forEach((box, j) => {
                        box.checked = false;
                        if (i == j) {
                           box.checked = true;
                           windowCalcBtnProfile.disabled = false;
                        }
                     })
                  } else {
                     state[prop] = item.value;
                  }
                  if (state.width !== 0 && state.height !== 0) {
                     windowCalcBtn.disabled = false;
                  }
                  break;
               case 'SELECT':
                  state[prop] = item.value;
                  break;
            };
            console.log(state);
         });
      });
   }

   bindActionToElems('click', windowForm, 'form');
   bindActionToElems('input', windowWidth, 'width');
   bindActionToElems('input', windowHeight, 'height');
   bindActionToElems('change', windowType, 'type');
   bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;