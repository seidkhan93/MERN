import {useCallback} from "react";


export const useMessage = () => {
  //оборачиваем в useCallback чтобы реакт не входил в цикличную рекурсию. Однако и без useCallback все работает у меня.
  return useCallback((text) => {
    if(window.M && text) {
      window.M.toast({html: text});
    }

  }, []);
}