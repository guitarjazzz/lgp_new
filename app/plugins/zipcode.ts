import {type App} from "vue";
export const zipcode = async (value:string) => {
  const validZip:any = await checkZip(value);
  return validZip;
}

const checkZip = async (zip:string) => {
  const validZip = 
    {"content":{"zipcode":`${zip}`,"city":"Fort Richardson","county":"Anchorage","state":"AK","stateName":"Alaska"},"success":true};
    // await request(`api/v1/geo/validate/?zipcode=${zip}`, 'GET', null);
  return validZip;
}

export default defineNuxtPlugin((nuxtApp) => {
  const app: App = nuxtApp.vueApp;
  if(!app.config.globalProperties.validation) app.config.globalProperties.validation = {};
  app.config.globalProperties.validation.zipcode = zipcode;
})
