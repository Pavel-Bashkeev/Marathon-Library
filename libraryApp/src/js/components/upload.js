import toBase64 from "./toBase64.js"

const uploadPreview = document.querySelector('.form-upload__preview');
const uploadInput = document.querySelector('.form-upload__input');

export const uploadPriview = () => {

  uploadInput.addEventListener('change', async () => {
    if(uploadInput.files.length > 0){
      const base64 = await toBase64(uploadInput.files[0]);
      uploadPreview.src = base64;
    }
  })

}