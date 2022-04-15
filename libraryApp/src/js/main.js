import { formAdd } from './components/formAdd.js';
import { routes } from './components/routesCustom.js';
import { search } from './components/search.js';
const init = () => {
  window.location.hash = '#/'
  // routes
  routes()
  // routes


  // search
  search();
  // search


  // form add book
  formAdd()
  // form add book

}

init();

