window.addEventListener('DOMContentLoaded', function() {

  let characterTextAreaElement = document.getElementById("characterTextArea");
  let hexTextAreaElement = document.getElementById("hexTextArea");
  let contentTextAreaElement = document.getElementById("contentTextArea");

  let hexCopyBtnElement = document.getElementById("hexCopyBtn");
  let contentCopyBtnElement = document.getElementById("contentCopyBtn");

  let hexDebugElement = document.getElementById("hexDebug");
  let contentDebugBtnElement = document.getElementById("contentDebug");

  characterTextAreaElement.addEventListener("input",function(){

    let hexNumCharRefValue = charToHexNumCharRef(this.value);
    let charToHexNumCharRefForContentValue = charToHexNumCharRefForContent(this.value);
    
    hexTextAreaElement.value = hexNumCharRefValue;
    contentTextAreaElement.value = charToHexNumCharRefForContentValue;
    
    hexDebugElement.innerHTML = `
      ${hexNumCharRefValue}
    `;

    contentDebugBtnElement.innerHTML = `
      <style>
        #contentDebug::before{
          content: "${charToHexNumCharRefForContentValue}";
        }
      </style>
    `
  })

  hexCopyBtnElement.addEventListener("click",function(){
    hexTextAreaElement.select();
    document.execCommand('copy');
  })

  contentCopyBtnElement.addEventListener("click",function(){
    contentTextAreaElement.select();
    document.execCommand('copy');
  })

  /**
   * 文字列を16進数数値文字参照に変換する
   * @param {String} character 文字列
   * @returns {String} 16進数数値文字参照
   */
  function charToHexNumCharRef(character){
    let hex = "";
    
    for(let val of character){
      hex += "&#x" + val.codePointAt(0).toString(16) + ";";
    }

    return hex;
  }

  /**
   * 文字列をcontent(CSS)用16進数数値文字参照に変換する
   * @param {String} character 文字列
   * @returns {String} content(CSS)用16進数数値文字参照
   */
  function charToHexNumCharRefForContent(character){
    let hex = "";
    
    for(let val of character){
      hex += "\\" + val.codePointAt(0).toString(16);
    }

    return hex;
  }

});