  /* create data models */

  export  function createDecodingModel(string, words) {
    return {
      string: string,
      words: words,
    };
  }

  export  function createEncodeModel(string) {
    
    return {
      string: string,
    };
  }


  /* store recently encoded text in localstorage */

  export  function updateLastEncodeResult(string, words) {
    localStorage.setItem("string", string);
    localStorage.setItem("words", words);
  }

