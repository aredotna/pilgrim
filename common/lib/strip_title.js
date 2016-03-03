import stupidText from './stupid_text.js';

export default function (title){
  let newTitle = "";
  stupidText.map(string => {
    newTitle = title.replace(string, "");
  });
  return newTitle;
}
